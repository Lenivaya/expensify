import { Inject, Injectable } from '@nestjs/common'
import type { Pool } from 'pg'
import { CONNECTION_POOL } from './database.module-definition'
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres'
import { databaseSchema } from './schema/database-schema'

/**
 * Service that provides access to the Drizzle ORM instance.
 *
 * @description
 * This service initializes and manages the Drizzle ORM connection to PostgreSQL.
 * It wraps the connection pool with Drizzle ORM functionality and provides
 * type-safe database operations through the schema definition.
 *
 * @example
 * // Inject and use the service
 * class YourService {
 *   constructor(private readonly drizzleService: DrizzleService) {}
 *
 *   async findUser(id: string) {
 *     return await this.drizzleService.db.query.users.findFirst({
 *       where: (users, { eq }) => eq(users.id, id)
 *     });
 *   }
 * }
 */
@Injectable()
export class DrizzleService {
  /**
   * The Drizzle ORM database instance.
   * Provides type-safe access to all database operations.
   *
   * @public
   * @type {NodePgDatabase<typeof databaseSchema>}
   */
  public db: NodePgDatabase<typeof databaseSchema>

  /**
   * Creates a new DrizzleService instance.
   *
   * @param pool - The PostgreSQL connection pool
   * @constructor
   */
  constructor(@Inject(CONNECTION_POOL) private readonly pool: Pool) {
    this.db = drizzle(this.pool, { schema: databaseSchema })
  }
}
