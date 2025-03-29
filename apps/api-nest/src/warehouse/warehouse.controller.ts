import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import {
  CreateWarehouseDto,
  createWarehouseSchema,
  UpdateWarehouseDto,
  updateWarehouseSchema,
  WarehouseCreateResponseDto,
  WarehouseUpdateResponseDto,
} from './dto/';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { CurrentUserDecorator } from '../common/decorators/current-user.decorator';
import { TokenPayloadDto } from '../auth/dto';

@UseGuards(JwtAuthGuard)
@Controller('warehouses')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(createWarehouseSchema))
    payload: CreateWarehouseDto,
    @CurrentUserDecorator() currentUser: TokenPayloadDto
  ): Promise<WarehouseCreateResponseDto> {
    return this.warehouseService.create(payload, currentUser.tenantId);
  }

  @Get()
  async findAll(
    @CurrentUserDecorator() { tenantId }: TokenPayloadDto
  ): Promise<WarehouseCreateResponseDto[]> {
    return this.warehouseService.findAll(tenantId);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @CurrentUserDecorator() { tenantId }: TokenPayloadDto
  ): Promise<WarehouseCreateResponseDto> {
    return this.warehouseService.findOne(id, tenantId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateWarehouseSchema))
    payload: UpdateWarehouseDto,
    @CurrentUserDecorator() { tenantId }: TokenPayloadDto
  ): Promise<WarehouseUpdateResponseDto> {
    return this.warehouseService.update(id, payload, tenantId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async softDelete(
    @Param('id') id: string,
    @CurrentUserDecorator() { tenantId }: TokenPayloadDto
  ): Promise<void> {
    await this.warehouseService.softDelete(id, tenantId);
  }
}
