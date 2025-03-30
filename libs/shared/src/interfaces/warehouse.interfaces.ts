import { IStockItem } from './stock-item.interfaces';

export interface IWarehouseData {
  id: string;
  name: string;
  location?: string;
  tenantId: string;
  companyId: string;
  isActive?: boolean;
  isDeleted: boolean;
  capacity?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  stockItems?: IStockItem[];
}

export type IWarehouse = IWarehouseData;

// Client payload for creation (FE ➜ BE)
export type IWarehouseCreatePayload = Omit<
  IWarehouseData,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'stockItems' | 'isDeleted'
>;

// Response to client after creation
export type IWarehouseCreateResponse = Pick<
  IWarehouseData,
  | 'id'
  | 'name'
  | 'location'
  | 'createdAt'
  | 'updatedAt'
  | 'capacity'
  | 'isActive'
>;

// Update payload from FE ➜ BE
export type IWarehouseUpdatePayload = Partial<
  Pick<IWarehouseData, 'name' | 'location' | 'isActive' | 'capacity'>
>;

// Response after update
export type IWarehouseUpdateResponse = Pick<
  IWarehouseData,
  | 'id'
  | 'name'
  | 'location'
  | 'createdAt'
  | 'updatedAt'
  | 'capacity'
  | 'isActive'
>;
