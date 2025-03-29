import { z } from 'zod';

export const RegisterDtoSchema = z
  .object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(100),
  })
  .strict();

export type RegisterDto = z.infer<typeof RegisterDtoSchema>;
