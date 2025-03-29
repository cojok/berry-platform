export interface ICompany {
  id: string;
  name: string;
  tenantId: string;
  isOwner: boolean;
  isAdminUserCreated: boolean;
  createdAt: Date;
  updatedAt: Date;
  address?: string;
  email?: string;
  phone?: string;
  taxId?: string;
}
