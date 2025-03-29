import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from './config/config.service';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { VersioningType } from '@nestjs/common';
import { ZodValidationPipe } from './common/pipes/zod-validation.pipe';
import { ZodExceptionFilter } from './common/filters/zod-exception.filter';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true, exposeHeadRoutes: false }),
    {
      bufferLogs: true,
    }
  );

  const configService = app.get(ConfigService);

  app.useLogger(app.get(Logger));

  app.useGlobalPipes(new ZodValidationPipe());
  app.useGlobalFilters(new ZodExceptionFilter());

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'v',
  });

  app.enableCors({ methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'] });

  await app.listen(configService.port, () =>
    console.log(`Server running on http://localhost:${configService.port}...`)
  );
}

void bootstrap();
