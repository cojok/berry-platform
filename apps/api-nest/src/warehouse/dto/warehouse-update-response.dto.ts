import { warehouseCreateResponseSchema } from './warehouse-create-response.dto';
import { z } from 'zod';

export const warehouseUpdateResponseSchema =
  warehouseCreateResponseSchema.partial();

export type WarehouseUpdateResponseDto = z.infer<
  typeof warehouseUpdateResponseSchema
>;
