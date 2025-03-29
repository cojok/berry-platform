// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToMany,
//   CreateDateColumn,
//   UpdateDateColumn,
// } from 'typeorm';
// import { IsUUID, IsString, IsBoolean } from 'class-validator';
// import { StockItemEntity } from './stock-item.entities';
//
// @Entity({
//   schema: 'public',
// })
// export class WarehouseEntity {
//   @PrimaryGeneratedColumn('uuid')
//   id!: string;
//
//   @Column({ type: 'uuid' })
//   @IsUUID()
//   tenantId!: string;
//
//   @Column({ type: 'uuid' })
//   @IsUUID()
//   companyId!: string;
//
//   @Column()
//   @IsString()
//   name!: string;
//
//   @Column()
//   @IsString()
//   location!: string;
//
//   @ManyToMany(() => StockItemEntity, stockItem => stockItem.warehouses)
//   stockItems!: StockItemEntity  [];
//
//   @CreateDateColumn()
//   createdAt!: Date;
//
//   @UpdateDateColumn()
//   updatedAt!: Date;
//
//   @Column({ default: false })
//   @IsBoolean()
//   isDeleted: boolean = false;
// }
