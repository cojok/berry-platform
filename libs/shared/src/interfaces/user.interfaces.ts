import { ICompany } from './company.interfaces';
import { ITenant } from './tenant.interfaces';
import { Roles } from '../types/';

export interface IUser {
  id: string;
  email: string;
  name: string;
  auth0UserId?: string;
  role: Roles;
  isDeleted: boolean;
  isEmailVerified: boolean;
  tenantId: string;
  tenant: ITenant;
  companyId?: string;
  company: ICompany;
  createdAt: Date;
  updatedAt: Date;
}
