import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StockItemEntity } from '../../stock-item/entities/stock-item.entity';

@Entity({
  name: 'warehouse',
  schema: 'public',
  comment: 'Stores warehouse information for stock allocation',
})
export class WarehouseEntity {
  @PrimaryGeneratedColumn('uuid', {
    comment: 'Primary UUID identifier for the warehouse',
  })
  id!: string;

  @Column({
    type: 'uuid',
    nullable: false,
    comment: 'Foreign key to the tenant table',
  })
  @Index('idx_warehouse_tenant_id')
  tenantId!: string;

  @Column({
    type: 'uuid',
    nullable: false,
    comment: 'Foreign key to the company table',
  })
  @Index('idx_warehouse_company_id')
  companyId!: string;

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

  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
  })
  @Index('idx_warehouse_deleted')
  isDeleted!: boolean;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
  })
  updatedAt!: Date;

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
}
