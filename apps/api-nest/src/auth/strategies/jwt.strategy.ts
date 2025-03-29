import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayloadDto } from '../dto';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getEnv<string>('JWT_SECRET'),
      algorithms: ['HS256'],
    });
  }

  async validate(payload: TokenPayloadDto): Promise<{
    userId: string;
    email: string;
    role: string;
    tenantId: string;
  }> {
    return {
      userId: payload.userId,
      email: payload.email,
      role: payload.role || 'viewer',
      tenantId: payload.tenantId,
    };
  }
}
