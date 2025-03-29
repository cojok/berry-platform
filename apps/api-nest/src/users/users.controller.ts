import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, CreateUserSchema } from './dto/create-user.dto';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUserDecorator } from '../common/decorators/current-user.decorator';
import { TokenPayloadDto } from '../auth/dto';
import { UserEntity } from './entities/user.entity';

@Controller('users')
@UseGuards(AuthGuard('jwt')) // Require authentication for all routes
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @CurrentUserDecorator() currentUser: TokenPayloadDto,
    @Body(new ZodValidationPipe(CreateUserSchema)) payload: CreateUserDto
  ): Promise<UserEntity> {
    this.logger.log(`Admin ${currentUser.userId} is creating a new user.`);
    return this.usersService.create(currentUser.userId, payload);
  }

  // @Get()
  // async findAll(
  //   @Request() req: { user: { tenantId: string } }
  // ): Promise<User[]> {
  //   this.logger.log(`Fetching all users for tenant ${req.user.tenantId}`);
  //   return this.usersService.findAll(req.user.tenantId);
  // }
  //
  // @Get('me')
  // async findProfile(@Request() req: { user: { id: string } }): Promise<User> {
  //   this.logger.log(`Fetching profile for user ${req.user.id}`);
  //   return this.usersService.findOne(req.user.id);
  // }
  //
  // @Patch(':id')
  // async update(
  //   @Request() req: { user: { id: string } },
  //   @Param('id') userId: string,
  //   @Body(new ZodValidationPipe(UpdateUserSchema)) payload: UpdateUserDto
  // ): Promise<User> {
  //   this.logger.log(`Admin ${req.user.id} is updating user ${userId}`);
  //   return this.usersService.update(req.user.id, userId, payload);
  // }
  //
  // @Patch('me')
  // async updateOwnProfile(
  //   @Request() req: { user: { id: string } },
  //   @Body(new ZodValidationPipe(UpdateUserSchema)) payload: UpdateUserDto
  // ): Promise<User> {
  //   this.logger.log(`User ${req.user.id} is updating their profile.`);
  //   return this.usersService.updateOwnProfile(req.user.id, payload);
  // }
  //
  // @Delete(':id')
  // async delete(
  //   @Request() req: { user: { id: string } },
  //   @Param('id') userId: string
  // ): Promise<void> {
  //   this.logger.log(`Admin ${req.user.id} is deleting user ${userId}`);
  //   await this.usersService.delete(req.user.id, userId);
  // }
}
