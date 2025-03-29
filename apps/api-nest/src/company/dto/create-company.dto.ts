import { z } from 'zod';

export const createCompanySchema = z
  .object({
    isOwner: z.boolean(),
    isAdminUserCreated: z.boolean(),
    name: z.string(),
    address: z.string(),
    email: z.string().email(),
    phone: z.string(),
    taxId: z.string(),
  })
  .strict();

export type CreateCompanyDto = z.infer<typeof createCompanySchema>;
