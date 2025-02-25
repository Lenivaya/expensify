import { Inject, Injectable } from '@nestjs/common'
import type { Pool } from 'pg'
import { CONNECTION_POOL } from './database.module-definition'
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres'
import { databaseSchema } from './schema/database-schema'

@Injectable()
export class DrizzleService {
  public db: NodePgDatabase<typeof databaseSchema>
  constructor(@Inject(CONNECTION_POOL) private readonly pool: Pool) {
    this.db = drizzle(this.pool, { schema: databaseSchema })
  }
}
