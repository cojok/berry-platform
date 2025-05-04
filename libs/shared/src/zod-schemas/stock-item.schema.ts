import { z, ZodTypeDef } from 'zod';

import {
  IStockItemCreateResponse,
  StockItemCreatePayload,
  StockItemData,
  StockItemUpdatePayload,
} from '../interfaces';

export const createStockItemSchema: z.ZodType<StockItemCreatePayload> = z
  .object({
    name: z.string(),
    description: z.string(),
    sku: z.string(),
    quantity: z.number().int().min(0),
    minimumQuantity: z.number().int().min(0),
  })
  .strict();

export const updateStockItemSchema: z.ZodType<StockItemUpdatePayload> = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    sku: z.string().optional(),
    quantity: z.number().int().min(0).optional(),
    minimum_quantity: z.number().int().min(0).optional(),
  })
  .strict();

export const stockItemResponseSchema: z.ZodType<IStockItemCreateResponse> = z
  .object({
    id: z.string(),
    tenantId: z.string(),
    companyId: z.string(),
    name: z.string(),
    description: z.string(),
    sku: z.string(),
    quantity: z.number(),
    minimumQuantity: z.number().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
    isDeleted: z.boolean(),
    company: z.any(),
    tenant: z.any(),
    warehouses: z.array(z.any()).optional(),
  })
  .strict();

export const stockItemCreateResponseMapperSchema: z.ZodType<
  IStockItemCreateResponse,
  ZodTypeDef,
  StockItemData
> = z
  .object({
    id: z.string(),
    tenantId: z.string(),
    companyId: z.string(),
    name: z.string(),
    description: z.string(),
    sku: z.string(),
    quantity: z.number(),
    minimumQuantity: z.number().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
    isDeleted: z.boolean(),
  })
  .strict()
  .transform(
    (
      data
    ): Omit<
      z.infer<typeof stockItemResponseSchema>,
      'isDeleted' | 'updatedAt' | 'tenantId' | 'companyId'
    > => ({
      id: data.id,
      name: data.name,
      description: data.description,
      sku: data.sku,
      quantity: data.quantity,
      createdAt: data.createdAt,
      minimumQuantity: data.minimumQuantity ?? 0,
    })
  );
