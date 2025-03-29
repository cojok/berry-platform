import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { ConfigModule } from '../config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantEntity } from './entities/tenant.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([TenantEntity])],
  providers: [TenantsService],
  exports: [TenantsService],
  controllers: [TenantsController],
})
export class TenantsModule {}
