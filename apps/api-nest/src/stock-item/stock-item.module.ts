import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockItemController } from './stock-item.controller';
import { StockItemService } from './stock-item.service';
import { StockItemEntity } from './entities/stock-item.entity';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [TypeOrmModule.forFeature([StockItemEntity]), CompanyModule],
  controllers: [StockItemController],
  providers: [StockItemService],
  exports: [StockItemService],
})
export class StockItemModule {}
