import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WarehouseEntity } from './entities/warehouse.entity';
import {
  CreateWarehouseDto,
  UpdateWarehouseDto,
  WarehouseCreateResponseDto,
  warehouseCreateResponseSchema,
  WarehouseUpdateResponseDto,
  warehouseUpdateResponseSchema,
} from './dto';
import { CompanyService } from '../company/company.service';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(WarehouseEntity)
    private readonly warehouseRepository: Repository<WarehouseEntity>,
    private readonly companyService: CompanyService
  ) {}

  async create(
    payload: CreateWarehouseDto,
    tenantId: string
  ): Promise<WarehouseCreateResponseDto> {
    const companyId = await this.companyService.findOneByTenantId(tenantId);
    if (companyId === null || companyId === undefined) {
      throw new NotFoundException(
        `Company with tenant ID ${tenantId} not found`
      );
    }
    console.log({
      ...payload,
      companyId: companyId.id,
      tenantId,
    });
    const warehouse = this.warehouseRepository.create({
      ...payload,
      companyId: companyId.id,
      tenantId,
    });

    const savedWarehouse = await this.warehouseRepository.save(warehouse);
    return warehouseCreateResponseSchema.parse(savedWarehouse);
  }

  async findAll(tenantId: string): Promise<WarehouseCreateResponseDto[]> {
    const warehouses = await this.warehouseRepository.find({
      where: { tenantId },
    });

    return warehouses.map((warehouse) =>
      warehouseCreateResponseSchema.parse(warehouse)
    );
  }

  async findOne(
    id: string,
    tenantId: string
  ): Promise<WarehouseCreateResponseDto> {
    const warehouse = await this.warehouseRepository.findOne({
      where: { id, tenantId },
    });

    if (warehouse === null || warehouse === undefined) {
      throw new NotFoundException(`Warehouse with ID ${id} not found`);
    }

    return warehouseCreateResponseSchema.parse(warehouse);
  }

  async update(
    id: string,
    payload: UpdateWarehouseDto,
    tenantId: string
  ): Promise<WarehouseUpdateResponseDto> {
    const warehouse = await this.findOne(id, tenantId);
    if (warehouse === null || warehouse === undefined) {
      throw new NotFoundException(`Warehouse with ID ${id} not found`);
    }

    const updatedWarehouse = await this.warehouseRepository.save({
      ...warehouse,
      ...payload,
    });

    return warehouseUpdateResponseSchema.parse(updatedWarehouse);
  }

  async softDelete(id: string, tenantId: string): Promise<void> {
    const warehouse = await this.findOne(id, tenantId);

    if (warehouse === null || warehouse === undefined) {
      throw new NotFoundException(`Warehouse with ID ${id} not found`);
    }

    await this.warehouseRepository.softDelete({ id, tenantId });
  }
}
