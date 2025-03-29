import { z } from 'zod';

export const updateStockItemSchema = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    sku: z.string().optional(),
    quantity: z.number().int().min(0).optional(),
    minimum_quantity: z.number().int().min(0).optional(),
  })
  .strict();

export type UpdateStockItemDto = z.infer<typeof updateStockItemSchema>;
