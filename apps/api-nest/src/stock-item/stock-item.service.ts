// apps/api-nest/src/stock-item/stock-item.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateStockItemDto,
  StockItemResponseDto,
  stockItemResponseSchema,
  UpdateStockItemDto,
} from './dto';
import { StockItemEntity } from './entities/stock-item.entity';

@Injectable()
export class StockItemService {
  constructor(
    @InjectRepository(StockItemEntity)
    private stockItemRepository: Repository<StockItemEntity>
  ) {}

  async create(
    payload: CreateStockItemDto,
    tenantId: string
  ): Promise<StockItemResponseDto> {
    const stockItem = this.stockItemRepository.create({
      ...payload,
      tenantId,
    });
    const newStockItem = await this.stockItemRepository.save(stockItem);
    return stockItemResponseSchema.parse(newStockItem);
  }

  async findAll(tenantId: string): Promise<StockItemResponseDto[]> {
    return await this.stockItemRepository.find({
      where: { tenantId, isDeleted: false },
    });
  }

  async findOne(id: string, tenantId: string): Promise<StockItemResponseDto> {
    const stockItem = await this.stockItemRepository.findOne({
      where: { id, tenantId, isDeleted: false },
    });

    if (stockItem === null || stockItem === undefined) {
      throw new NotFoundException(`Stock item with ID "${id}" not found`);
    }

    return stockItemResponseSchema.parse(stockItem);
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

    return updatedStockItem as StockItemResponseDto;
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
