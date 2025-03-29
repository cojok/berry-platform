import { Injectable, NestMiddleware } from '@nestjs/common';
import { DoneFuncWithErrOrRes, FastifyReply, FastifyRequest } from 'fastify';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(
    req: FastifyRequest,
    res: FastifyReply,
    next: DoneFuncWithErrOrRes
  ): void {
    const hostname = req.hostname;
    const subdomain = hostname.split('.')[0];

    req.headers['tenant-domain'] = subdomain;

    next();
  }
}
