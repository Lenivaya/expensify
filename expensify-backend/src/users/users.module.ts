import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { CacheModule } from '@nestjs/cache-manager'

/**
 * Users Module for the Expensify application.
 *
 * This module encapsulates all functionality related to user management,
 * including user profiles, financial data, and user-specific operations.
 * It provides the UsersService to other modules and configures the necessary
 * dependencies like caching for optimal performance.
 *
 * The module includes:
 * - UsersController: Handles HTTP requests related to user operations
 * - UsersService: Implements business logic for user-related operations
 * - CacheModule: Provides caching capabilities for improved performance
 */
@Module({
  imports: [CacheModule.register()],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
