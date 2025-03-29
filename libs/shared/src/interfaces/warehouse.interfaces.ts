export interface IWarehouse {
  id: string;
  name: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  capacity?: number;
  status: 'active' | 'inactive';
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}