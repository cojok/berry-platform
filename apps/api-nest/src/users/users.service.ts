import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigService } from '../config/config.service';

import axios from 'axios';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  private readonly auth0ClientId: string;
  private readonly auth0ClientSecret: string;
  private readonly auth0AudienceUrl: string;
  private readonly auth0TokenUrl: string;
  private readonly auth0ConnectionType: string;
  private readonly auth0SignUpUrl: string;
  private readonly auth0DefautlPassword: string;

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private configService: ConfigService
  ) {
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
    this.auth0SignUpUrl = `https://${this.configService.getEnv<string>(
      'AUTH0_DOMAIN'
    )}/dbconnections/signup`;
    this.auth0DefautlPassword = this.configService.getEnv<string>(
      'AUTH0_DEFAULT_PASSWORD'
    );
  }

  async create(adminId: string, payload: CreateUserDto): Promise<UserEntity> {
    const adminUser = await this.userRepository.findOne({
      where: { id: adminId },
    });

    if (!adminUser || adminUser.role !== 'admin') {
      throw new ForbiddenException('Only admins can create users');
    }

    // Get Auth0 token for the SPA application
    const auth0TokenResponse = await axios.post(this.auth0TokenUrl, {
      client_id: this.auth0ClientId,
      client_secret: this.auth0ClientSecret,
      audience: this.auth0AudienceUrl,
      grant_type: 'client_credentials',
    });

    const auth0Token = auth0TokenResponse.data.access_token;

    // Create user in Auth0 via Authentication API
    const auth0UserResponse = await axios.post(
      this.auth0SignUpUrl,
      {
        client_id: this.auth0ClientId,
        email: payload.email,
        password: this.auth0DefautlPassword,
        connection: this.auth0ConnectionType,
        name: payload.name,
      },
      {
        headers: {
          Authorization: `Bearer ${auth0Token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const auth0UserId = auth0UserResponse.data._id;

    this.logger.log(
      `User ${auth0UserId} created in Auth0 with a default password`
    );
    const localUserPayload = Object.assign({}, payload, {
      auth0UserId,
      tenant: adminUser.tenant,
    });
    return this.createLocalUser(localUserPayload);
  }

  public async createLocalUser(payload: CreateUserDto): Promise<UserEntity> {
    const { email, name, auth0UserId, tenantId, role } = payload;
    const user = this.userRepository.create({
      email,
      name,
      auth0UserId,
      tenantId,
      role,
    });

    console.log(user);

    return this.userRepository.save(user);
  }

  public async findUserByAuth0Id(
    auth0UserId: string
  ): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ where: { auth0UserId } });
  }

  public async addCompanyIdToUser(
    userId: string,
    companyId: string
  ): Promise<void> {
    await this.userRepository.update(userId, { companyId });
  }

  /*async update(
    adminId: string,
    userId: string,
    payload: UpdateUserDto
  ): Promise<User> {
    const adminUser = await this.userRepository.findOne({
      where: { id: adminId },
    });

    if (!adminUser || adminUser.role !== 'admin') {
      throw new ForbiddenException('Only admins can update users');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (user === null) {
      throw new NotFoundException(`User ${userId} not found`);
    }
    await this.auth0.users.update(
      { id: user.auth0UserId },
      {
        name: payload.name,
        app_metadata: { role: payload.role, status: payload.status },
      }
    );

    this.logger.log(`User ${user.auth0UserId} updated in Auth0`);

    await this.userRepository.update(userId, payload);
    return (await this.userRepository.findOne({
      where: { id: userId },
    })) as unknown as User;
  }

  async delete(adminId: string, userId: string): Promise<void> {
    const adminUser = await this.userRepository.findOne({
      where: { id: adminId },
    });

    if (!adminUser || adminUser.role !== 'admin') {
      throw new ForbiddenException('Only admins can delete users');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User ${userId} not found`);
    }

    await this.userRepository.update(userId, {
      status: 'inactive',
      isDeleted: true,
    });

    await this.auth0.users.delete({ id: user.auth0UserId });
    this.logger.log(`User ${user.auth0UserId} deleted from Auth0`);
  }*/
}
