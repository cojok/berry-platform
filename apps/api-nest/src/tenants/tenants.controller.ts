import { Controller, Delete, Get, Param } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantEntity } from './entities/tenant.entity';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantService: TenantsService) {}

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<TenantEntity> {
    return this.tenantService.findOneById(id);
  }

  @Delete(':id')
  async softDelete(@Param('id') id: string): Promise<void> {
    return this.tenantService.softDelete(id);
  }
}
