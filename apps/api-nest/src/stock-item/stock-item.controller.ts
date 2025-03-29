import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StockItemService } from './stock-item.service';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  CreateStockItemDto,
  createStockItemSchema,
  StockItemResponseDto,
  UpdateStockItemDto,
  updateStockItemSchema,
} from './dto';
import { CurrentUserDecorator } from '../common/decorators/current-user.decorator';
import { TokenPayloadDto } from '../auth/dto';

@Controller('stock-items')
@UseGuards(JwtAuthGuard)
export class StockItemController {
  constructor(private readonly stockItemService: StockItemService) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(createStockItemSchema))
    payload: CreateStockItemDto,
    @CurrentUserDecorator() currentUser: TokenPayloadDto
  ): Promise<StockItemResponseDto> {
    return await this.stockItemService.create(payload, currentUser.tenantId);
  }

  @Get()
  async findAll(
    @CurrentUserDecorator() { tenantId }: TokenPayloadDto
  ): Promise<StockItemResponseDto[]> {
    return await this.stockItemService.findAll(tenantId);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @CurrentUserDecorator() { tenantId }: TokenPayloadDto
  ): Promise<StockItemResponseDto> {
    return await this.stockItemService.findOne(id, tenantId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateStockItemSchema))
    payload: UpdateStockItemDto,
    @CurrentUserDecorator() { tenantId }: TokenPayloadDto
  ): Promise<StockItemResponseDto> {
    return await this.stockItemService.update({ id, payload, tenantId });
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(
    @Param('id') id: string,
    @CurrentUserDecorator() { tenantId }: TokenPayloadDto
  ): Promise<void> {
    await this.stockItemService.softDelete({ id, tenantId });
  }
}
