import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyEntity } from './entities/company.entity';
import {
  CompanyResponseDto,
  companyResponseSchema,
  CreateCompanyDto,
  UpdateCompanyDto,
} from './dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,
    private userService: UsersService
  ) {}

  async create(payload: {
    createCompanyData: CreateCompanyDto;
    tenantId: string;
    userId: string;
  }): Promise<CompanyResponseDto> {
    const { createCompanyData, tenantId, userId } = payload;
    const companyExists = await this.companyRepository.findOne({
      where: { tenantId, isDeleted: false },
    });
    if (companyExists !== null) {
      throw new ConflictException(
        'Tenant Account already has 1 company. For now 1 company per tenant account.'
      );
    }
    const { name, email, isOwner, isAdminUserCreated, taxId, phone, address } =
      createCompanyData;
    const company = this.companyRepository.create();
    company.name = name;
    company.email = email;
    company.isOwner = isOwner;
    company.isAdminUserCreated = isAdminUserCreated;
    company.taxId = taxId;
    company.phone = phone;
    company.address = address;
    company.tenantId = tenantId;

    const newCompany = await this.companyRepository.save(company);

    await this.userService.addCompanyIdToUser(userId, newCompany.id);

    return companyResponseSchema.parse(newCompany);
  }

  async update(payload: {
    id: string;
    payload: UpdateCompanyDto;
    tenantId: string;
  }): Promise<CompanyResponseDto> {
    const { id, payload: updateCompanyDto, tenantId } = payload;
    const company = await this.companyRepository.findOne({
      where: { id, tenantId, isDeleted: false },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    Object.assign(company, updateCompanyDto);
    const updatedCompany = this.companyRepository.save(company);
    return companyResponseSchema.parse(updatedCompany);
  }

  async softDelete(payload: { id: string; tenantId: string }): Promise<void> {
    const { id, tenantId } = payload;
    const company = await this.companyRepository.findOne({
      where: { id, tenantId, isDeleted: false },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    company.isDeleted = true;
    await this.companyRepository.save(company);
  }

  async findOneByTenantId(tenantId: string): Promise<{ id: string } | null> {
    return await this.companyRepository.findOne({
      where: { tenantId, isDeleted: false },
      select: ['id'],
    });
  }
}
