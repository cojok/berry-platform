import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import {
  Auth0CreateUserResponse,
  Auth0TokenResponse,
  LoginResponse,
  RefreshTokenResponse,
} from '../common/interfaces';
import { PinoLogger } from 'nestjs-pino';
import { JwtService } from '@nestjs/jwt';
import Redis from 'ioredis';
import { decryptToken, encryptedToken } from '../common/helpers';
import { ConfigService } from '../config/config.service';
import { UsersService } from '../users/users.service';
import { TenantsService } from '../tenants/tenants.service';
import { UserEntity } from '../users/entities/user.entity';
import { RegisterDto, TokenPayloadDto } from './dto';

interface Auth0UserInfo {
  sub: string;
  email: string;
  roles?: string[];
  tenant_id?: string;
}

@Injectable()
export class AuthService {
  private readonly auth0ClientId: string;
  private readonly auth0ClientSecret: string;
  private readonly auth0AudienceUrl: string;
  private readonly auth0TokenUrl: string;
  private readonly auth0UsersUrl: string;
  private readonly auth0UserInfoUrl: string;
  private readonly auth0RevokeUrl: string;
  private readonly auth0ForgotPasswordUrl: string;
  private readonly auth0ConnectionType: string;
  private readonly auth0DefautlPassword: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: PinoLogger,
    private jwtService: JwtService,
    @Inject('REDIS_CLIENT') private redisClient: Redis,
    private readonly userService: UsersService,
    private readonly tenantService: TenantsService
  ) {
    this.logger.setContext(AuthService.name);
    this.auth0ClientId = this.configService.getEnv<string>('AUTH0_CLIENT_ID');
    this.auth0ClientSecret = this.configService.getEnv<string>(
      'AUTH0_CLIENT_SECRET'
    );
    this.auth0AudienceUrl = this.configService.getEnv<string>('AUTH0_AUDIENCE');
    this.auth0ConnectionType = this.configService.getEnv<string>(
      'AUTH0_CONNECTION_TYPE'
    );
    this.auth0TokenUrl = `${this.configService.getEnv<string>(
      'AUTH0_DOMAIN'
    )}/oauth/token`;
    this.auth0UserInfoUrl = `${this.configService.getEnv<string>(
      'AUTH0_DOMAIN'
    )}/userinfo`;
    this.auth0UsersUrl = `${this.configService.getEnv<string>(
      'AUTH0_DOMAIN'
    )}/dbconnections/signup`;
    this.auth0RevokeUrl = `${this.configService.getEnv<string>(
      'AUTH0_DOMAIN'
    )}/oauth/revoke`;
    this.auth0ForgotPasswordUrl = this.configService.getEnv(
      'AUTH0_PASSWORD_RESET_URL'
    );
    this.auth0DefautlPassword = this.configService.getEnv<string>(
      'AUTH0_DEFAULT_PASSWORD'
    );
  }

  public async login(email: string, password: string): Promise<LoginResponse> {
    try {
      if (password === this.auth0DefautlPassword) {
        throw new ForbiddenException(
          'Change initial password in order to login.'
        );
      }
      const loginData: AxiosResponse<Auth0TokenResponse> = await axios.post(
        this.auth0TokenUrl,
        {
          grant_type: 'password',
          client_id: this.auth0ClientId,
          client_secret: this.auth0ClientSecret,
          audience: this.auth0AudienceUrl,
          username: email,
          password,
          scope: 'openid profile email offline_access',
        }
      );

      const userInfo: AxiosResponse<Auth0UserInfo> = await axios.get(
        this.auth0UserInfoUrl,
        {
          headers: {
            Authorization: `Bearer ${loginData.data.access_token}`,
          },
        }
      );

      const localUserData = await this.userService.findUserByAuth0Id(
        userInfo.data.sub
      );

      if (localUserData === null) {
        throw new ForbiddenException('Login Failed');
      }

      const payload: TokenPayloadDto = {
        email: localUserData.email,
        userId: localUserData.id,
        role: localUserData.role,
        tenantId: localUserData.tenantId,
      };
      if (
        loginData.data.refresh_token !== null &&
        loginData.data.refresh_token !== undefined
      ) {
        await this.redisClient.set(
          `refresh:${payload.userId}`,
          encryptedToken(
            loginData.data.refresh_token,
            this.configService.getEnv<string>('SECRET')
          ),
          'EX',
          Math.min(loginData.data.expires_in, 86400) // Expiration
        );
      }

      const accessToken = this.jwtService.sign(payload, {
        expiresIn: loginData.data.expires_in,
      });
      return {
        accessToken: accessToken,
        refreshToken: loginData.data.refresh_token,
        expiresIn: loginData.data.expires_in,
        user: { ...localUserData },
      };
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  public async register(payload: RegisterDto): Promise<UserEntity> {
    try {
      const response: AxiosResponse<Auth0CreateUserResponse> = await axios.post(
        this.auth0UsersUrl,
        {
          client_id: this.auth0ClientId,
          email: payload.email,
          name: payload.name,
          password: payload.password,
          connection: this.auth0ConnectionType,
        }
      );
      const tenant = await this.tenantService.create({
        name: 'local-tenant',
      });
      return await this.userService.createLocalUser({
        role: 'admin',
        name: payload.name,
        email: payload.email,
        auth0UserId: response.data.user_id,
        tenantId: tenant.id,
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        throw new ConflictException(error);
      }
      throw new InternalServerErrorException(error);
    }
  }

  public async refreshToken(
    currentUser: TokenPayloadDto
  ): Promise<RefreshTokenResponse> {
    try {
      const refreshToken = await this.fetchDecryptedRefreshToken(
        currentUser.userId
      );
      const newRefreshToken: AxiosResponse<Auth0TokenResponse> =
        await axios.post(this.auth0TokenUrl, {
          grant_type: 'refresh_token',
          client_id: this.auth0ClientId,
          client_secret: this.auth0ClientSecret,
          refresh_token: refreshToken,
        });

      if (
        newRefreshToken.data.refresh_token !== null &&
        newRefreshToken.data.refresh_token !== undefined
      ) {
        await this.redisClient.set(
          `refresh:${currentUser.userId}`,
          encryptedToken(
            newRefreshToken.data.refresh_token,
            this.configService.getEnv<string>('SECRET')
          ),
          'EX',
          Math.min(newRefreshToken.data.expires_in, 86400) // Expiration
        );
      }

      const accessToken = this.jwtService.sign(currentUser, {
        expiresIn: newRefreshToken.data.expires_in, // 🔹 Sync expiration with Auth0
      });

      return {
        accessToken: accessToken,
        refreshToken: newRefreshToken.data.refresh_token,
        expiresIn: newRefreshToken.data.expires_in,
      };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new UnauthorizedException(error);
      }
      throw new InternalServerErrorException(error);
    }
  }

  public async logout(userId: string): Promise<void> {
    try {
      const refreshToken = await this.fetchDecryptedRefreshToken(userId);
      await this.redisClient.del(`refresh:${userId}`);
      await axios.post(this.auth0RevokeUrl, {
        client_id: this.auth0ClientId,
        client_secret: this.auth0ClientSecret,
        token: refreshToken,
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new UnauthorizedException(error);
      }
      throw new InternalServerErrorException(error);
    }
  }

  async forgotPassword(email: string): Promise<void> {
    this.logger.debug('Forgot password', email);
    try {
      const response = await axios.post(this.auth0ForgotPasswordUrl, {
        client_id: this.auth0ClientId,
        email,
        connection: this.auth0ConnectionType,
      });
      this.logger.info('Forgot password', response.status);
      if (response.status !== 200) {
        throw new InternalServerErrorException(
          'Failed to initiate password reset.'
        );
      }
      this.logger.debug('Forgot password reset token', email);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  // TODO will be used when we move to m2m
  private async getManagementToken(): Promise<string> {
    const response = await axios.post(this.auth0TokenUrl, {
      grant_type: 'client_credentials',
      client_id: this.auth0ClientId,
      client_secret: this.auth0ClientSecret,
      audience: `${this.auth0AudienceUrl}/api/v2/`,
    });

    return response.data.access_token;
  }

  private async fetchDecryptedRefreshToken(userId: string): Promise<string> {
    const encryptedRefreshToken = await this.redisClient.get(
      `refresh:${userId}`
    );
    if (encryptedRefreshToken === null) {
      throw new UnauthorizedException('Refresh token expired or not found');
    }
    return decryptToken(
      encryptedRefreshToken,
      this.configService.getEnv<string>('SECRET')
    );
  }
}
