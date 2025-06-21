import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TenantEntity } from '../../tenants/entities/tenant.entity';
import { WarehouseEntity } from '../../warehouse/entities/warehouse.entity';
import { CompanyEntity } from '../../company/entities/company.entity';

@Entity({
  name: 'stock_items',
  schema: 'public',
  comment: 'Stores inventory stock items',
})
export class StockItemEntity {
  @PrimaryGeneratedColumn('uuid', {
    comment: 'Primary UUID identifier for the stock item',
  })
  id!: string;

  @Column({
    name: 'tenant_id',
    type: 'uuid',
    nullable: false,
    comment: 'Foreign key to the tenant table',
  })
  @Index('idx_stockitem_tenant_id')
  tenantId!: string;

  @ManyToOne(() => TenantEntity, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'tenant_id',
    foreignKeyConstraintName: 'fk_stockitem_tenant',
  })
  tenant!: TenantEntity;

  @Column({
    name: 'company_id',
    type: 'uuid',
    nullable: false,
    comment: 'Foreign key to the company table',
  })
  @Index('idx_stockitem_company_id')
  companyId!: string;

  @ManyToOne(() => CompanyEntity, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'company_id',
    foreignKeyConstraintName: 'fk_stockitem_company',
  })
  company!: CompanyEntity;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  @Index('idx_stockitem_name')
  name!: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  description!: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  sku!: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  quantity!: number;

  @Column({
    name: 'minimum_quantity',
    type: 'int',
    nullable: false,
  })
  minimumQuantity!: number;

  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
  })
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

  @ManyToMany(() => WarehouseEntity, (warehouse) => warehouse.stockItems)
  @JoinTable({
    name: 'stock_item_warehouse',
    joinColumn: {
      name: 'stockItemId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'warehouseId',
      referencedColumnName: 'id',
    },
  })
  warehouses!: WarehouseEntity[];
}
