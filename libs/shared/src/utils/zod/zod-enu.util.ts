import { roles } from '../../constants/index';

export const getZodEnumRoles = Object.values(roles) as [
  (typeof roles)[keyof typeof roles]
];
