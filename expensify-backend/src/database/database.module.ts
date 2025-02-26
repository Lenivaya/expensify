import { Global, Module } from '@nestjs/common'
import {
  ConfigurableDatabaseModule,
  CONNECTION_POOL,
  DATABASE_OPTIONS
} from './database.module-definition'
import { DatabaseOptions } from './database-options'
import { Pool } from 'pg'
import { DrizzleService } from './drizzle.service'

/**
 * Global module that provides database connectivity for the application.
 *
 * @description
 * This module is responsible for:
 * - Setting up and managing the PostgreSQL connection pool
 * - Providing the Drizzle ORM service for database operations
 * - Making database services available globally throughout the application
 *
 * The module is configurable through the forRoot() method inherited from
 * ConfigurableDatabaseModule.
 *
 * @example
 * // In your app.module.ts
 * @Module({
 *   imports: [
 *     DatabaseModule.forRoot({
 *       host: 'localhost',
 *       port: 5432,
 *       user: 'postgres',
 *       password: 'secret',
 *       database: 'expensify'
 *     })
 *   ]
 * })
 * export class AppModule {}
 */
@Global()
@Module({
  exports: [DrizzleService],
  providers: [
    DrizzleService,
    {
      provide: CONNECTION_POOL,
      inject: [DATABASE_OPTIONS],
      /**
       * Factory function that creates a PostgreSQL connection pool.
       *
       * @param databaseOptions - The database configuration options
       * @returns {Pool} A configured PostgreSQL connection pool
       */
      useFactory: (databaseOptions: DatabaseOptions) => {
        return new Pool({
          host: databaseOptions.host,
          port: databaseOptions.port,
          user: databaseOptions.user,
          password: databaseOptions.password,
          database: databaseOptions.database
        })
      }
    }
  ]
})
export class DatabaseModule extends ConfigurableDatabaseModule {}
