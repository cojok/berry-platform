import { createStockItemSchema } from '@berry/shared';
import { z } from 'zod';

export type CreateStockItemDto = z.infer<typeof createStockItemSchema>;
