import { Logger, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';
import { LoggerModule } from 'nestjs-pino';
import { configValidationSchema } from './config.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { ThrottlerModule } from '@nestjs/throttler';

// import { makeCounterProvider, makeGaugeProvider, PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: configValidationSchema,
    }),
    LoggerModule.forRootAsync({
      providers: [],
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.loggerConfig,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.pgTypeOrmConfig,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          ttl: configService.getEnv('RATE_LIMIT_TIME_WINDOW'),
          limit: configService.getEnv('RATE_LIMIT_MAX'),
        },
      ],
    }),
    // PrometheusModule.register({
    //   defaultMetrics: {
    //     enabled: true,
    //   },
    // }),
  ],
  providers: [
    ConfigService,
    {
      provide: 'REDIS_CLIENT',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const logger = new Logger('RedisClient');
        const redisClient = new Redis(
          `${configService.getEnv<string>('REDIS_URL')}/0`
        );

        redisClient.on('error', (err) =>
          logger.error(`Redis Error: ${err.message}`)
        );
        redisClient.on('connect', () =>
          logger.log('Redis Connected Successfully')
        );
        redisClient.on('ready', () => logger.log('Redis Ready'));
        redisClient.on('end', () => logger.warn('Redis Connection Closed'));

        return redisClient;
      },
    },
    // makeCounterProvider({
    //   name: 'count',
    //   help: 'metric_help',
    //   labelNames: ['method', 'origin'] as string[],
    // }),
    // makeGaugeProvider({
    //   name: 'gauge',
    //   help: 'metric_help',
    // }),
  ],
  exports: [ConfigService, 'REDIS_CLIENT'],
})
export class ConfigModule {}
