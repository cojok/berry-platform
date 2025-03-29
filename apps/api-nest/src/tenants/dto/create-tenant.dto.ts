import { z } from 'zod';

export const CreateTenantSchema = z
  .object({
    name: z.string().min(3).max(50),
    isDeleted: z.boolean().optional(),
  })
  .strict();

export type CreateTenantDto = z.infer<typeof CreateTenantSchema>;
