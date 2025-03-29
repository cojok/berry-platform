import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { TokenPayloadDto } from '../dto';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<TUser = TokenPayloadDto>(
    err: Error | null,
    user: TUser,
    _info: unknown,
    _context: ExecutionContext,
    _status?: unknown
  ): TUser {
    console.log(user);
    if (err || user === false) {
      throw new UnauthorizedException('Invalid or missing token');
    }
    return user;
  }
}
