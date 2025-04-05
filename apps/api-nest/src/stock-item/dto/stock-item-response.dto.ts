import { z } from 'zod';

export const stockItemResponseSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  companyId: z.string(),
  name: z.string(),
  description: z.string(),
  sku: z.string(),
  quantity: z.number(),
  minimum_quantity: z.number().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
});

export type StockItemResponseDto = z.infer<typeof stockItemResponseSchema>;
