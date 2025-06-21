import { z } from 'zod';
import { updateStockItemSchema } from '@berry/shared';

export type UpdateStockItemDto = z.infer<typeof updateStockItemSchema>;
