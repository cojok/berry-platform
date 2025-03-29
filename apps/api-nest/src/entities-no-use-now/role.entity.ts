// import { Roles } from '@/user/types/types';
// import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
// import { User } from './user.entities';
// import { Tenant } from './tenant.entities';
//
// @Entity({
//   schema: 'public',
// })
// export class Role {
//   @PrimaryGeneratedColumn('uuid')
//   id!: string;
//
//   @Column({ type: 'varchar' })
//   name!: Roles;
//
//   @OneToMany(() => User, user => user.role)
//   users!: User[];
//
//   @Column('uuid')
//   tenantId!: string;
//
//   @ManyToOne(() => Tenant)
//   @JoinColumn({ name: 'tenantId' })
//   tenant!: Tenant;
// }
