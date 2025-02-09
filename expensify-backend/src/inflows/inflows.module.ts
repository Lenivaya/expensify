import { Module } from '@nestjs/common';
import { InflowsService } from './inflows.service';
import { InflowsController } from './inflows.controller';

@Module({
  providers: [InflowsService],
  controllers: [InflowsController]
})
export class InflowsModule {}
