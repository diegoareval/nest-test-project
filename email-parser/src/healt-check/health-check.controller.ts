import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health Check')
@Controller('health')
export class HealthCheckController {
  constructor(private health: HealthCheckService) {}

  @ApiResponse({
    status: 200,
    description: 'ok',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([]);
  }
}