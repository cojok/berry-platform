import { stockItemResponseSchema } from '@berry/shared';
import { z } from 'zod';

export type StockItemResponseDto = z.infer<typeof stockItemResponseSchema>;
