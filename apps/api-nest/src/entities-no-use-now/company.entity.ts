// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   CreateDateColumn,
//   UpdateDateColumn,
//   ManyToOne,
//   JoinColumn, OneToMany,
// } from 'typeorm';
// import { Tenant } from './tenant.entities';
// import { ICompany } from '@/company/types/interfaces';
// import { User } from './user.entities';
//
// @Entity({
//   schema: 'public',
// })
// export class Company implements ICompany {
//   @PrimaryGeneratedColumn('uuid')
//   id!: string;
//
//   @Column()
//   name!: string;
//
//   @Column()
//   address!: string; // Store full address
//
//   @Column({ nullable: true })
//   email!: string; // Contact email
//
//   @Column({ nullable: true })
//   phone!: string; // Contact phone number
//
//   @Column({ nullable: true })
//   taxId!: string; // Tax identification number
//
//   @Column('uuid')
//   tenantId!: string;
//
//   @ManyToOne(() => Tenant)
//   @JoinColumn({ name: 'tenantId' })
//   tenant!: Tenant;
//
//   @OneToMany(() => User, user => user.company)
//   users!: User[];
//
//   @CreateDateColumn()
//   createdAt!: Date;
//
//   @UpdateDateColumn()
//   updatedAt!: Date;
//
//   @Column({ default: false })
//   isDeleted: boolean = false;
//
//   @Column({ default: false })
//   isOwner: boolean = false;
//
//   @Column({ default: false })
//   isAdminUserCreated: boolean = false;
// }
