import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockItemController } from './stock-item.controller';
import { StockItemService } from './stock-item.service';
import { StockItemEntity } from './entities/stock-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockItemEntity])],
  controllers: [StockItemController],
  providers: [StockItemService],
  exports: [StockItemService],
})
export class StockItemModule {}
