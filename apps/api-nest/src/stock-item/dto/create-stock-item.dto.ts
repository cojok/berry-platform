import { z } from 'zod';

export const createStockItemSchema = z
  .object({
    tenantId: z.string().uuid(),
    companyId: z.string().uuid(),
    name: z.string(),
    description: z.string(),
    sku: z.string(),
    quantity: z.number().int().min(0),
    minimumQuantity: z.number().int().min(0),
  })
  .strict();

export type CreateStockItemDto = z.infer<typeof createStockItemSchema>;
