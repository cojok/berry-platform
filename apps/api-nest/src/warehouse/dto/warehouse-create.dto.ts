import { createWarehouseSchema } from '@berry/shared';
import { z } from 'zod';

export type CreateWarehouseDto = z.infer<typeof createWarehouseSchema>;
