import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '../config/config.module';
import { CustomLoggerMiddleware } from '../common/middlewares/custom-logger.middleware';
import { TenantMiddleware } from '../common/middlewares/tenant.middleware';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { TenantsModule } from '../tenants/tenants.module';
import { UsersModule } from '../users/users.module';
import { CompanyModule } from '../company/company.module';
import { StockItemModule } from '../stock-item/stock-item.module';
import { WarehouseModule } from '../warehouse/warehouse.module';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
    AuthModule,
    UsersModule,
    TenantsModule,
    CompanyModule,
    StockItemModule,
    WarehouseModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtStrategy, JwtAuthGuard],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(TenantMiddleware, CustomLoggerMiddleware)
      .forRoutes({ path: 'api/*path', method: RequestMethod.ALL });
  }
}
