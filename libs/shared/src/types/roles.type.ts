import { roles } from '../constants';

export type Roles = (typeof roles)[keyof typeof roles];
