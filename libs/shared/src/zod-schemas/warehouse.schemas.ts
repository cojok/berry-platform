import { z } from 'zod';
import {
  IWarehouse,
  IWarehouseCreatePayload,
  IWarehouseCreateResponse,
  IWarehouseUpdatePayload,
  IWarehouseUpdateResponse,
} from '../interfaces';

export const createWarehouseSchema: z.ZodType<IWarehouseCreatePayload> = z
  .object({
    name: z.string().min(1),
    location: z.string().optional(),
    tenantId: z.string().uuid().optional(),
    companyId: z.string().uuid().optional(),
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

export const warehouseCreateResponseMapperSchema: z.ZodType<
  IWarehouseCreateResponse,
  z.ZodTypeDef,
  IWarehouse
> = z
  .object({
    id: z.string().uuid(),
    name: z.string(),
    location: z.string(),
    capacity: z.number().optional(),
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable().optional(),
    tenantId: z.string().uuid(),
    companyId: z.string().uuid(),
    isDeleted: z.boolean(),
    stockItems: z.array(z.any()).optional(),
  })
  .strict()
  .transform((data): IWarehouseCreateResponse => {
    return {
      id: data.id,
      name: data.name,
      location: data.location,
      capacity: data.capacity,
      isActive: data.isActive,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  });

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
