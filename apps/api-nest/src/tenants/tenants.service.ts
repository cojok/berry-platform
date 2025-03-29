import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantEntity } from './entities/tenant.entity';
import { CreateTenantDto } from './dto/create-tenant.dto';

@Injectable()
export class TenantsService {
  private readonly logger = new Logger(TenantsService.name);

  constructor(
    @InjectRepository(TenantEntity)
    private readonly tenantRepository: Repository<TenantEntity>
  ) {}

  async create(payload: CreateTenantDto): Promise<TenantEntity> {
    this.logger.log(`Creating tenant: ${payload.name}`);

    const tenant = this.tenantRepository.create(payload);
    const savedTenant = await this.tenantRepository.save(tenant);

    this.logger.log(`Tenant created successfully with ID: ${savedTenant.id}`);
    return savedTenant;
  }

  async findOneById(id: string): Promise<TenantEntity> {
    this.logger.log(`Fetching tenant with ID: ${id}`);

    const tenant = await this.tenantRepository.findOne({
      where: { id, isDeleted: false },
    });

    if (tenant === null) {
      this.logger.warn(`Tenant with ID ${id} not found or deleted`);
      throw new NotFoundException(`Tenant with ID ${id} not found`);
    }

    this.logger.log(`Tenant with ID: ${id} found`);
    return tenant;
  }

  async softDelete(id: string): Promise<void> {
    this.logger.log(`Soft deleting tenant with ID: ${id}`);

    const tenant = await this.tenantRepository.findOne({
      where: { id, isDeleted: false },
    });

    if (tenant === null) {
      this.logger.warn(
        `Attempted to delete non-existent tenant with ID: ${id}`
      );
      throw new NotFoundException(`Tenant with ID ${id} not found`);
    }

    tenant.isDeleted = true;
    await this.tenantRepository.save(tenant);

    this.logger.log(`Tenant with ID: ${id} marked as deleted`);
  }
}
