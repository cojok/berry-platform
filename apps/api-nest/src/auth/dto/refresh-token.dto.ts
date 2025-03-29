import { z } from 'zod';

export const RefreshTokenDtoSchema = z
  .object({
    refresh_token: z.string().min(10),
  })
  .strict();

export type RefreshTokenDto = z.infer<typeof RefreshTokenDtoSchema>;
