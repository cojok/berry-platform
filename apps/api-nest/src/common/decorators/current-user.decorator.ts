import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorator that extracts the user from the JWT token in the request
 * Usage: @CurrentUser() user: TokenPayloadDto
 */
export const CurrentUserDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
