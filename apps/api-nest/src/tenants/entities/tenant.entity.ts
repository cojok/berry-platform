import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CompanyEntity } from '../../company/entities/company.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity({ name: 'tenants', schema: 'public' })
export class TenantEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column({ default: false })
  isDeleted!: boolean;

  @OneToMany(() => UserEntity, (user) => user.tenant)
  users!: UserEntity[];

  @OneToMany(() => CompanyEntity, (company) => company.tenant)
  companies!: CompanyEntity[];

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
