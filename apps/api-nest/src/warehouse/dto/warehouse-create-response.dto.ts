import { z } from 'zod';
import { warehouseCreateResponseSchema } from '@berry/shared';

export type WarehouseCreateResponseDto = z.infer<
  typeof warehouseCreateResponseSchema
>;
