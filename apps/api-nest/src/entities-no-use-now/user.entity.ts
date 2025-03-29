import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tenant } from './tenant.entity';
import { Roles, roles } from '@berry/shared';

@Entity({ name: 'users', schema: 'public' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true, nullable: false })
  email!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  auth0UserId!: string;

  @Column({
    type: 'enum',
    enum: Object.values(roles),
    default: roles.Viewer,
  })
  role!: Roles;

  @Column({ default: false })
  isDeleted!: boolean;

  @Column({ default: false })
  isEmailVerified!: boolean;

  @Column('uuid')
  tenantId!: string;

  @ManyToOne(() => Tenant, (tenant) => tenant.users, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tenantId' })
  tenant!: Tenant;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;
}
