import { z } from 'zod';

export const TokenPayloadSchema = z
  .object({
    email: z.string(),
    userId: z.string(),
    role: z.string(),
    tenantId: z.string(),
  })
  .strict();

export type TokenPayloadDto = z.infer<typeof TokenPayloadSchema>;
