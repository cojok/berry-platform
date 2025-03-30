import { z } from 'zod';
import {
  IWarehouseCreatePayload,
  IWarehouseCreateResponse,
  IWarehouseUpdatePayload,
  IWarehouseUpdateResponse,
} from '../interfaces';

export const createWarehouseSchema: z.ZodType<IWarehouseCreatePayload> = z
  .object({
    name: z.string().min(1),
    location: z.string().optional(),
    tenantId: z.string().uuid(),
    companyId: z.string().uuid(),
    isActive: z.boolean().optional(),
    capacity: z.number().int().nonnegative().optional(),
  })
  .strict();

export const warehouseCreateResponseSchema: z.ZodType<IWarehouseCreateResponse> =
  z
    .object({
      id: z.string().uuid(),
      name: z.string(),
      location: z.string(),
      capacity: z.number().optional(),
      isActive: z.boolean(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
    .strict();

export const updateWarehouseSchema: z.ZodType<IWarehouseUpdatePayload> = z
  .object({
    name: z.string().min(1).optional(),
    location: z.string().optional(),
    isActive: z.boolean().optional(),
    capacity: z.number().int().nonnegative().optional(),
  })
  .strict();

export const warehouseUpdateResponseSchema: z.ZodType<IWarehouseUpdateResponse> =
  z
    .object({
      id: z.string().uuid(),
      name: z.string(),
      location: z.string(),
      capacity: z.number().optional(),
      isActive: z.boolean(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
    .strict();
