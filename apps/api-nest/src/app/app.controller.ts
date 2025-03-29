import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(): { message: string } {
    return this.appService.getData();
  }

  @Get('/test')
  @UseGuards(JwtAuthGuard)
  getProtectedResource(): { message: string } {
    return { message: 'You have access!' };
  }
}
