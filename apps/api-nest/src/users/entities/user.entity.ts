import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TenantEntity } from '../../tenants/entities/tenant.entity';
import { Roles, roles } from '@berry/shared';
import { CompanyEntity } from '../../company/entities/company.entity';

@Entity({ name: 'users', schema: 'public' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true, nullable: false })
  email!: string;

  @Column()
  name!: string;

  @Column({ nullable: true, name: 'auth0_user_id' })
  auth0UserId!: string;

  @Column({
    type: 'enum',
    enum: Object.values(roles),
    default: roles.Viewer,
  })
  role!: Roles;

  @Column({ default: false })
  isDeleted!: boolean;

  @Column({ default: false, name: 'is_email_verified' })
  isEmailVerified!: boolean;

  @Column({ type: 'uuid', nullable: false, default: false, name: 'tenant_id' })
  tenantId!: string;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.users, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant!: TenantEntity;

  @Column({ type: 'uuid', nullable: true, name: 'company_id' })
  companyId!: string;

  @ManyToOne(() => CompanyEntity, (company) => company.users, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company!: CompanyEntity;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt!: Date;
}
