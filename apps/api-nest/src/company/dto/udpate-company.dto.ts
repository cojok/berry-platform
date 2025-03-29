import { z } from 'zod';

export const updateCompanySchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  taxId: z.string().optional(),
});

export type UpdateCompanyDto = z.infer<typeof updateCompanySchema>;
