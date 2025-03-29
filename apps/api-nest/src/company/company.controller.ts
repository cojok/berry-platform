import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  CompanyResponseDto,
  CreateCompanyDto,
  createCompanySchema,
  UpdateCompanyDto,
  updateCompanySchema,
} from './dto';
import { CurrentUserDecorator } from '../common/decorators/current-user.decorator';
import { TokenPayloadDto } from '../auth/dto';

@Controller('companies')
@UseGuards(JwtAuthGuard)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(
    @CurrentUserDecorator() currentUser: TokenPayloadDto,
    @Body(new ZodValidationPipe(createCompanySchema)) payload: CreateCompanyDto
  ): Promise<CompanyResponseDto> {
    return await this.companyService.create({
      createCompanyData: payload,
      tenantId: currentUser.tenantId,
      userId: currentUser.userId,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateCompanySchema)) payload: UpdateCompanyDto,
    @CurrentUserDecorator() { tenantId }: TokenPayloadDto
  ): Promise<CompanyResponseDto> {
    return await this.companyService.update({ id, payload, tenantId });
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(
    @Param('id') id: string,
    @CurrentUserDecorator() { tenantId }: TokenPayloadDto
  ): Promise<void> {
    await this.companyService.softDelete({ id, tenantId });
  }
}
