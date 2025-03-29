import { z } from 'zod';

export const createWarehouseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),
  capacity: z.number().positive().optional(),
  status: z.enum(['active', 'inactive']).default('active'),
});

export type CreateWarehouseDto = z.infer<typeof createWarehouseSchema>;
