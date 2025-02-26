import { Module } from '@nestjs/common'
import { InflowsService } from './inflows.service'
import { InflowsController } from './inflows.controller'
import { UsersModule } from 'src/users/users.module'

/**
 * Module handling all inflow-related functionality.
 * Manages income transactions and their associated operations.
 * Depends on UsersModule for user-related operations and caching.
 */
@Module({
  imports: [UsersModule],
  providers: [InflowsService],
  controllers: [InflowsController]
})
export class InflowsModule {}
