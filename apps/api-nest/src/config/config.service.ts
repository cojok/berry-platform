import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { Params as PinoHttpParams, PinoLogger } from 'nestjs-pino';
import * as crypto from 'crypto';
import * as process from 'process';
import { DataSourceOptions } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { TenantEntity } from '../tenants/entities/tenant.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DBLogger } from '../common/logger/db.logger';
import { CompanyEntity } from '../company/entities/company.entity';
import { WarehouseEntity } from '../warehouse/entities/warehouse.entity';
import { StockItemEntity } from '../stock-item/entities/stock-item.entity';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  public getEnv<T>(key: string): T {
    const env = this.configService.get<T>(key);
    if (env === undefined) {
      throw new Error(`wrong key for env or env not found: ${key}`);
    }
    return env;
  }

  get isProduction(): boolean {
    return this.configService.get<string>('NODE_ENV') === 'production';
  }

  get port(): number {
    return Number(this.configService.get<string>('PORT', '3000'));
  }

  // pino config
  get loggerConfig(): PinoHttpParams {
    const prettyLog = {
      target: 'pino-pretty',
      options: {
        colorize: true,
        levelFirst: true,
        translateTime: 'SYS:standard',
        singleLine: true,
      },
    };

    const fileLog = {
      target: 'pino/file', // Raw JSON logs to file
      options: {
        destination: '../../logs/nestjs.log',
        mkdir: true, // Automatically create directories if they don't exist
      },
    };

    return {
      pinoHttp: {
        mixin: () => ({ traceId: crypto.randomUUID(), pid: process.pid }),
        name: 'berry-nest',
        level: this.configService.get<string>('LOG_LEVEL'),
        timestamp: () => `,"time":"${new Date().toISOString()}"`,
        redact: ['req.headers.authorization', 'password'],
        serializers: {
          req: (req) => ({
            method: req.method,
            url: req.url,
            headers: req.headers,
          }),
        },
        transport: {
          targets: [prettyLog, fileLog],
        },
      },
    } as const;
  }

  // PostgreSQL configuration getters
  get postgresHost(): string {
    return this.configService.get<string>('POSTGRES_HOST', 'localhost');
  }

  get postgresPort(): number {
    return Number(this.configService.get<string>('POSTGRES_PORT', '5432'));
  }

  get postgresUser(): string {
    return <string>this.configService.get<string>('POSTGRES_USER', 'pg-user');
  }

  get postgresPassword(): string {
    return <string>(
      this.configService.get<string>('POSTGRES_PASSWORD', 'pg-password')
    );
  }

  get postgresDb(): string {
    return <string>this.configService.get<string>('POSTGRES_DB', 'pg-db');
  }

  get typeormSynchronize(): boolean {
    return this.isProduction;
  }

  get pgTypeOrmConfig(): DataSourceOptions {
    return {
      type: 'postgres', // type of our database
      host: this.postgresHost, // database host
      port: this.postgresPort, // database host port
      username: this.postgresUser, // username
      password: this.postgresPassword, // user password
      database: this.postgresDb, // name of our database
      synchronize: this.typeormSynchronize, // only during development
      namingStrategy: new SnakeNamingStrategy(),
      // entities-no-use-now: [path.resolve(__dirname, '../**/*.entities.{js,ts}')],
      // migrations: [path.resolve(__dirname, '../migrations/*.entities.{js,ts}')],
      entities: [
        UserEntity,
        TenantEntity,
        CompanyEntity,
        WarehouseEntity,
        StockItemEntity,
      ],
      // migrationsRun: this.configService.get<boolean>(
      //   'POSTGRES_DB_MIGRATIONS_RUN',
      //   false
      // ),
      schema: 'public',
      logger: new DBLogger(
        new PinoLogger({ pinoHttp: this.loggerConfig.pinoHttp })
      ),
    } as const;
  }

  get auth0Domain(): string {
    return this.configService.get<string>('AUTH0_DOMAIN', 'localhost');
  }

  get auth0Audience(): string {
    return this.configService.get<string>('AUTH0_AUDIENCE', 'localhost');
  }

  get auth0ClientId(): string {
    return this.configService.get<string>('AUTH0_CLIENT_ID', 'client_id');
  }

  get auth0ClientSecret(): string {
    return this.configService.get<string>(
      'AUTH0_CLIENT_SECRET',
      'client_secret'
    );
  }

  get redisConfig(): Record<string, string | number> {
    return {
      url: this.configService.get<string>('REDIS_URL', 'localhost'),
      ttl: this.configService.get<number>('REDIS_TTL', 86400),
    };
  }

  get apiRateLimit(): number {
    return this.configService.get<number>('RATE_LIMIT_MAX', 10);
  }

  get apiRateLimitTimeWindow(): string {
    return `${this.configService.get<number>('RATE_LIMIT_TIME_WINDOW', 60)}s`;
  }
}
