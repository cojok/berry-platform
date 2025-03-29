import { z } from 'zod';

export const UpdateUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long').optional(),
  role: z.enum(['user', 'admin']).optional(),
  status: z.enum(['active', 'inactive']).optional(),
});

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
