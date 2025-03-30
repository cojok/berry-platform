import { Column, Entity, Index, JoinTable, ManyToMany } from 'typeorm';
import { StockItemEntity } from '../../stock-item/entities/stock-item.entity';
import { IWarehouse } from '@berry/shared';
import { BaseTenantEntity } from '../../common/entities/base.entity';

@Index(['tenantId', 'companyId'])
@Entity({
  name: 'warehouse',
  schema: 'public',
  comment: 'Stores warehouse information for stock allocation',
})
export class WarehouseEntity extends BaseTenantEntity implements IWarehouse {
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  @Index('idx_warehouse_name')
  name!: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  location!: string;

  @ManyToMany(() => StockItemEntity, (stockItem) => stockItem.warehouses, {
    cascade: false,
  })
  @JoinTable({
    name: 'stock_item_warehouse',
    joinColumn: {
      name: 'warehouseId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'stockItemId',
      referencedColumnName: 'id',
    },
  })
  stockItems!: StockItemEntity[];

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'int', nullable: true })
  capacity?: number;
}
