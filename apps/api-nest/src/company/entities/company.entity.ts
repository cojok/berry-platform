import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TenantEntity } from '../../tenants/entities/tenant.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { ICompany } from '@berry/shared';

@Entity({ name: 'company', comment: 'Stores company information' })
export class CompanyEntity implements ICompany {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  @Check('check_company_name_not_empty', 'LENGTH(TRIM(name)) > 0')
  @Index('idx_company_name')
  name!: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  address!: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  email!: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  phone!: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  taxId!: string;

  @Column({
    type: 'uuid',
    nullable: false,
    comment: 'Foreign key to the tenant table',
    name: 'tenant_id',
  })
  @Index('idx_company_tenant_id')
  tenantId!: string;

  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
  })
  @Index('idx_company_deleted')
  isDeleted!: boolean;

  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
  })
  isOwner!: boolean;

  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
  })
  isAdminUserCreated!: boolean;

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

  @ManyToOne(() => TenantEntity, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'tenant_id',
    foreignKeyConstraintName: 'fk_company_tenant',
  })
  tenant!: TenantEntity;

  @OneToMany(() => UserEntity, (user) => user.company)
  users!: UserEntity[];
}
