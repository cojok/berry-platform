import { Module } from '@nestjs/common';
import { RbacService } from './rbac.service';

@Module({
  providers: [RbacService],
  controllers: [],
})
export class RbacModule {}
