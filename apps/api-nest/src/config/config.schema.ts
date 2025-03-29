import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
  SALT: Joi.string().required(),
  SECRET: Joi.string().required(),
  LOG_LEVEL: Joi.string()
    .valid('debug', 'info', 'warn', 'error')
    .default('info'),

  // ✅ PostgreSQL Database Configuration
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().default(5432),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),

  // ✅ Auth0 Configuration
  AUTH0_DOMAIN: Joi.string().uri().required(),
  AUTH0_AUDIENCE: Joi.string().required(),
  AUTH0_CLIENT_ID: Joi.string().required(),
  AUTH0_CLIENT_SECRET: Joi.string().required(),
  AUTH0_PASSWORD_RESET_URL: Joi.string().uri().required(),
  // Redis
  REDIS_PASSWORD: Joi.string().required(),
  REDIS_URL: Joi.string()
    .uri({ scheme: [/^redis/, /^rediss/] })
    .required(),

  // Rate limit
  RATE_LIMIT_MAX: Joi.number().default(5),
  RATE_LIMIT_TIME_WINDOW: Joi.number().default(5),
});
