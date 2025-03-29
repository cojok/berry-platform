import { Injectable, NestMiddleware } from '@nestjs/common';
import { DoneFuncWithErrOrRes, FastifyReply, FastifyRequest } from 'fastify';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class CustomLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: PinoLogger) {}

  use(
    req: FastifyRequest['raw'],
    res: FastifyReply['raw'],
    next: DoneFuncWithErrOrRes
  ): void {
    const { method, url } = req;
    const start = Date.now();
    const tenant = req.headers['tenant-domain'] ?? 'unknown-tenant';

    res.on('finish', () => {
      const duration = Date.now() - start;
      const statusCode = res.statusCode || 0; // Ensure fallback value for statusCode
      this.logger.info(
        {
          method,
          tenant,
          url,
          statusCode,
          duration: `${duration}ms`,
        },
        'Request completed'
      );
    });

    next();
  }
}
