import { ConfigurableModuleBuilder } from '@nestjs/common'
import { DatabaseOptions } from './database-options'

/**
 * Token used to inject the PostgreSQL connection pool instance.
 * This token should be used with @Inject() decorator when injecting the pool.
 *
 * @constant
 * @type {string}
 */
export const CONNECTION_POOL = 'CONNECTION_POOL'

/**
 * Configurable module builder for the database module.
 * Creates a dynamic module that can be configured with database options.
 *
 * @description
 * This builder creates:
 * - ConfigurableDatabaseModule: The base class for the dynamic module
 * - DATABASE_OPTIONS: Token for injecting the provided options
 *
 * The module can be configured using the forRoot() method:
 * @example
 * DatabaseModule.forRoot({
 *   host: 'localhost',
 *   port: 5432,
 *   user: 'postgres',
 *   password: 'secret',
 *   database: 'expensify'
 * })
 */
export const {
  ConfigurableModuleClass: ConfigurableDatabaseModule,
  MODULE_OPTIONS_TOKEN: DATABASE_OPTIONS
} = new ConfigurableModuleBuilder<DatabaseOptions>()
  .setClassMethodName('forRoot')
  .build()
