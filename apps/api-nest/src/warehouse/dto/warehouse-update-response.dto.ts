import { warehouseUpdateResponseSchema } from '@berry/shared';
import { z } from 'zod';

export type WarehouseUpdateResponseDto = z.infer<
  typeof warehouseUpdateResponseSchema
>;
