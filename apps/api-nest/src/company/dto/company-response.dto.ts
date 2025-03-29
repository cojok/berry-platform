import { z } from 'zod';
import { CreateTenantSchema } from '../../tenants/dto/create-tenant.dto';
import { CreateUserSchema } from '../../users/dto/create-user.dto';

export const companyResponseSchema = z
  .object({
    id: z.string().uuid(),
    tenantId: z.string().uuid(),
    isOwner: z.boolean(),
    isAdminUserCreated: z.boolean(),
    name: z.string(),
    address: z.string(),
    email: z.string().optional(),
    phone: z.string().optional(),
    taxId: z.string().optional(),
    isDeleted: z.boolean().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
    tenant: CreateTenantSchema.optional(),
    users: CreateUserSchema.optional(),
  })
  .strict();

export type CompanyResponseDto = z.infer<typeof companyResponseSchema>;
