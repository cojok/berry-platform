import { createWarehouseSchema } from './warehouse-create.dto';
import { z } from 'zod';

export const updateWarehouseSchema = createWarehouseSchema.partial();

export type UpdateWarehouseDto = z.infer<typeof updateWarehouseSchema>;
