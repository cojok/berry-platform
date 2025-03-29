import { z } from 'zod';

export const warehouseCreateResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  zipCode: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  capacity: z.number().nullable().optional(),
  status: z.enum(['active', 'inactive']),
  tenantId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable().optional(),
});

export type WarehouseCreateResponseDto = z.infer<
  typeof warehouseCreateResponseSchema
>;
