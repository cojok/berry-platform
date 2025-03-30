import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  MemoryHealthIndicator,
  MicroserviceHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { ConfigService } from '../../config/config.service';

@Controller('health')
export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly typeOrm: TypeOrmHealthIndicator,
    private readonly microservice: MicroserviceHealthIndicator,
    private readonly diskCheck: DiskHealthIndicator,
    private readonly memoryIndicator: MemoryHealthIndicator,
    private readonly configService: ConfigService
  ) {}

  // GET /health → Performs a general health check
  @Get()
  @HealthCheck()
  async checkHealth(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([
      async () =>
        this.diskCheck.checkStorage('disk', {
          path: '/',
          thresholdPercent: 0.9,
        }),
      async () =>
        this.memoryIndicator.checkRSS('memory_rss', 500 * 1024 * 1024), // 500MB
      async () => this.typeOrm.pingCheck('postgresql'),
      async () =>
        this.microservice.pingCheck('redis', {
          transport: 1,
          options: this.configService.redisConfig,
        }),
      async () =>
        this.memoryIndicator.checkHeap('memory_heap', 150 * 1024 * 1024),
    ]);
  }
}
