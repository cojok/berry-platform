import { z } from 'zod';
import { stockItemCreateResponseMapperSchema } from '@berry/shared';

export type StockItemCreateResponseDto = z.infer<
  typeof stockItemCreateResponseMapperSchema
>;
