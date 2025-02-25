import { Module } from '@nestjs/common'
import { InflowsService } from './inflows.service'
import { InflowsController } from './inflows.controller'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [UsersModule],
  providers: [InflowsService],
  controllers: [InflowsController]
})
export class InflowsModule {}
