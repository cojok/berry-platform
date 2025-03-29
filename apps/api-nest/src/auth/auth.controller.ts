import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponse, RefreshTokenResponse } from '../common/interfaces';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { UserEntity } from '../users/entities/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Throttle } from '@nestjs/throttler';
import {
  ForgotPasswordDto,
  ForgotPasswordSchema,
  LoginDto,
  LoginDtoSchema,
  RegisterDto,
  RegisterDtoSchema,
  TokenPayloadDto,
} from './dto';
import { CurrentUserDecorator } from '../common/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Throttle({ default: { limit: 3, ttl: 60 * 1000 } })
  async login(
    @Body(new ZodValidationPipe(LoginDtoSchema)) payload: LoginDto
  ): Promise<LoginResponse> {
    return this.authService.login(payload.email, payload.password);
  }

  @Post('register')
  @Throttle({ default: { limit: 3, ttl: 10 * 60 * 1000 } })
  async register(
    @Body(new ZodValidationPipe(RegisterDtoSchema)) payload: RegisterDto
  ): Promise<UserEntity> {
    return this.authService.register(payload);
  }

  @Get('refresh')
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 5, ttl: 5 * 60 * 1000 } })
  async refresh(
    @CurrentUserDecorator() currentUser: TokenPayloadDto
  ): Promise<RefreshTokenResponse> {
    return this.authService.refreshToken(currentUser);
  }

  @Delete('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async logout(
    @CurrentUserDecorator() { userId }: TokenPayloadDto
  ): Promise<void> {
    return this.authService.logout(userId);
  }

  @Post('forgot-password')
  @HttpCode(204)
  @Throttle({ default: { limit: 5, ttl: 5 * 60 * 1000 } })
  async forgotPassword(
    @Body(new ZodValidationPipe(ForgotPasswordSchema))
    payload: ForgotPasswordDto
  ): Promise<void> {
    return this.authService.forgotPassword(payload.email);
  }
}
