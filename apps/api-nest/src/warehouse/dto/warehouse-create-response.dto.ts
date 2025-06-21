import { z } from 'zod';
import { warehouseCreateResponseMapperSchema } from '@berry/shared';

export type WarehouseCreateResponseDto = z.infer<
  typeof warehouseCreateResponseMapperSchema
>;
