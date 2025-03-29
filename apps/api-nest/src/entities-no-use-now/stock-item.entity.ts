// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToMany,
//   JoinTable,
//   CreateDateColumn,
//   UpdateDateColumn, JoinColumn, ManyToOne,
// } from 'typeorm';
// import { IsUUID, IsString, IsNumber, Min, IsBoolean } from 'class-validator';
// import { Tenant } from './tenant.entities';
// import { Company } from './company.entities';
// import { WarehouseEntity } from './warehouse.entities';
//
// @Entity({
//   schema: 'public',
// })
// export class StockItemEntity {
//   @PrimaryGeneratedColumn('uuid')
//   id!: string;
//
//   @Column({ type: 'uuid' })
//   @IsUUID()
//   tenantId!: string;
//
//   @ManyToOne(() => Tenant)
//   @JoinColumn({ name: 'tenantId' })
//   tenant!: Tenant;
//
//   @Column({ type: 'uuid' })
//   @IsUUID()
//   companyId!: string;
//
//   @ManyToOne(() => Company)
//   @JoinColumn({ name: 'companyId' })
//   company!: Company;
//
//   @Column()
//   @IsString()
//   name!: string;
//
//   @Column()
//   @IsString()
//   description!: string;
//
//   @Column({ unique: true })
//   @IsString()
//   sku!: string;
//
//   @Column({ type: 'int' })
//   @IsNumber()
//   @Min(0)
//   quantity!: number;
//
//   @Column({ type: 'int' })
//   @IsNumber()
//   @Min(0)
//   minimum_quantity!: number;
//
//   @ManyToMany(() => WarehouseEntity, warehouse => warehouse.stockItems)
//   @JoinTable({
//     name: 'stock_item_warehouse',
//     joinColumn: {
//       name: 'stockItemId',
//       referencedColumnName: 'id',
//     },
//     inverseJoinColumn: {
//       name: 'warehouseId',
//       referencedColumnName: 'id',
//     },
//   })
//   warehouses!: WarehouseEntity[];
//
//   @CreateDateColumn()
//   createdAt!: Date;
//
//   @UpdateDateColumn()
//   updatedAt!: Date;
//
//   @Column()
//   @IsBoolean()
//   isDeleted: boolean = false;
// }
