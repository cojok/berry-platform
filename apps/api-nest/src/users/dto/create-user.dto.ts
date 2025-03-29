import { getZodEnumRoles, roles } from '@berry/shared';
import { z } from 'zod';

export const CreateUserSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(2, 'Name must be at least 2 characters long'),
    role: z.enum([...getZodEnumRoles]).default(roles.Viewer),
    auth0UserId: z.string(),
    tenantId: z.string().uuid(),
    companyId: z.string().uuid().optional(),
  })
  .strict();

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
