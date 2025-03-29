import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as process from 'node:process';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';

// @ts-ignore just because here we don't need strict types
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({
  path: path.resolve(__dirname, '../../.env'),
});

export default new DataSource({
  type: 'postgres', // type of our database
  host: process.env.POSTGRES_HOST, // database host
  port: Number(process.env.POSTGRES_PORT ?? 5432), // database host port
  username: process.env.POSTGRES_USER, // username
  password: process.env.POSTGRES_PASSWORD, // user password
  database: process.env.POSTGRES_DB, // name of our database
  synchronize: process.env.NODE_ENV !== 'production', // only during development
  namingStrategy: new SnakeNamingStrategy(),
  entities: [
    path.resolve(__dirname, '../entities-no-use-now/*.entities.{js,ts}'),
  ],
  migrations: [path.resolve(__dirname, '../migrations/*.entities.{js,ts}')],
  migrationsRun: Boolean(process.env.POSTGRES_DB_MIGRATIONS_RUN),
  schema: 'public',
  logger: 'advanced-console',
});
