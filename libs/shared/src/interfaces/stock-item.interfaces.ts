import { ICompany } from './company.interfaces';
import { ITenant } from './tenant.interfaces';
import { IWarehouse } from './warehouse.interfaces';

export interface IStockItem {
  id: string;
  tenantId: string;
  companyId: string;
  name: string;
  description: string;
  sku: string;
  quantity: number;
  minimumQuantity?: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  company?: ICompany;
  warehouses?: IWarehouse[];
  tenant?: ITenant;
}

export type StockItemData = IStockItem;

export const stockItemAPIEndpointsV1 = 'v1/stock-items';

export type StockItemCreatePayload = Partial<
  Omit<
    StockItemData,
    | 'id'
    | 'createdAt'
    | 'updatedAt'
    | 'deletedAt'
    | 'stockItems'
    | 'isDeleted'
    | 'tenantId'
    | 'companyId'
  >
>;

export type StockItemUpdatePayload = Partial<
  Pick<
    StockItemData,
    'name' | 'description' | 'sku' | 'quantity' | 'minimumQuantity'
  >
>;

export type StockItemResponse = StockItemData;

export type IStockItemCreateResponse = Pick<
  StockItemData,
  | 'id'
  | 'name'
  | 'description'
  | 'sku'
  | 'quantity'
  | 'minimumQuantity'
  | 'createdAt'
>;
