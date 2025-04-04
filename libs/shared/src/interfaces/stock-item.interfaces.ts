export interface IStockItem {
  id: string;
  tenantId: string;
  companyId: string;
  name: string;
  description: string;
  sku: string;
  quantity: number;
  minimumQuantity: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}
