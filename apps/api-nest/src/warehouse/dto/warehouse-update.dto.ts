import { updateWarehouseSchema } from '@berry/shared';
import { z } from 'zod';

export type UpdateWarehouseDto = z.infer<typeof updateWarehouseSchema>;
