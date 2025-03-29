import { Logger, QueryRunner } from 'typeorm';
import { PinoLogger } from 'nestjs-pino';

export class DBLogger implements Logger {
  constructor(private readonly logger: PinoLogger) {}

  logQuery(
    query: string,
    parameters: unknown[] = [],
    _queryRunner?: QueryRunner
  ): void {
    this.logger.info({ query, parameters }, 'Query executed');
  }

  logQueryError(
    error: string | Error,
    query: string,
    parameters: unknown[] = [],
    _queryRunner?: QueryRunner
  ): void {
    this.logger.error(
      {
        error: error instanceof Error ? error.message : error,
        query,
        parameters,
      },
      'Query failed'
    );
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters: unknown[] = [],
    _queryRunner?: QueryRunner
  ): void {
    this.logger.warn({ time, query, parameters }, 'Slow query detected');
  }

  logSchemaBuild(message: string, _queryRunner?: QueryRunner): void {
    this.logger.debug({ message }, 'Schema build event');
  }

  logMigration(message: string, _queryRunner?: QueryRunner): void {
    this.logger.info({ message }, 'Migration event');
  }

  log(
    level: 'log' | 'info' | 'warn',
    message: unknown,
    _queryRunner?: QueryRunner
  ): void {
    const formattedMessage =
      typeof message === 'string' ? message : JSON.stringify(message);

    switch (level) {
      case 'log':
        this.logger.debug({ message: formattedMessage }, 'General log');
        break;
      case 'info':
        this.logger.info({ message: formattedMessage }, 'General info');
        break;
      case 'warn':
        this.logger.warn({ message: formattedMessage }, 'Warning');
        break;
      default:
        this.logger.info(
          { message: formattedMessage },
          'Unspecified log level'
        );
    }
  }
}
