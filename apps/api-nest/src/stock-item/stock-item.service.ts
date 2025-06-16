import {
  stockItemCreateResponseMapperSchema,
  stockItemResponseSchema,
} from '@berry/shared';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateStockItemDto,
  StockItemCreateResponseDto,
  StockItemResponseDto,
  UpdateStockItemDto,
} from './dto';
import { StockItemEntity } from './entities/stock-item.entity';
import { CompanyService } from '../company/company.service';

@Injectable()
export class StockItemService {
  private readonly logger = new Logger(StockItemService.name);

  constructor(
    @InjectRepository(StockItemEntity)
    private readonly stockItemRepository: Repository<StockItemEntity>,
    private readonly companyService: CompanyService
  ) {}

  async create(
    data: CreateStockItemDto & { tenantId: string }
  ): Promise<StockItemCreateResponseDto> {
    const { tenantId, name, description, sku, quantity, minimumQuantity } =
      data;
    const companyId = await this.companyService.findOneByTenantId(tenantId);
    if (companyId === null) {
      this.logger.error(`Company with tenant ID ${tenantId} not found`, data);
      throw new NotFoundException(
        `Company with tenant ID ${tenantId} not found`
      );
    }
    const newStockItemData = {
      name,
      description,
      sku,
      quantity,
      minimumQuantity,
      tenantId,
      companyId: companyId.id,
    };
    const stockItem = this.stockItemRepository.create(newStockItemData);
    const newStockItem = await this.stockItemRepository.save(stockItem);
    return stockItemCreateResponseMapperSchema.parse(newStockItem);
  }

  async findAll(tenantId: string): Promise<StockItemResponseDto[]> {
    const stockItems = await this.stockItemRepository.find({
      where: { tenantId, isDeleted: false },
    });
    if (stockItems.length === 0) {
      throw new NotFoundException(
        `No stock items found for tenant ${tenantId}`
      );
    }
    console.log(stockItems);
    return stockItems.map((stockItem) =>
      stockItemResponseSchema.parse(stockItem)
    );
  }

  async findOne(id: string, tenantId: string): Promise<StockItemResponseDto> {
    const stockItem = await this.stockItemRepository.findOne({
      where: { id, tenantId, isDeleted: false },
    });

    if (stockItem === null) {
      throw new NotFoundException(`Stock item with ID "${id}" not found`);
    }

    return stockItemCreateResponseMapperSchema.parse(stockItem);
  }

  async update({
    id,
    payload,
    tenantId,
  }: {
    id: string;
    payload: UpdateStockItemDto;
    tenantId: string;
  }): Promise<StockItemResponseDto> {
    const stockItem = await this.findOne(id, tenantId);

    const updatedStockItem = await this.stockItemRepository.save({
      ...stockItem,
      ...payload,
    });

    return stockItemCreateResponseMapperSchema.parse(updatedStockItem);
  }

  async softDelete({
    id,
    tenantId,
  }: {
    id: string;
    tenantId: string;
  }): Promise<void> {
    const stockItem = await this.findOne(id, tenantId);
    await this.stockItemRepository.save({
      ...stockItem,
      isDeleted: true,
    });
  }
}
