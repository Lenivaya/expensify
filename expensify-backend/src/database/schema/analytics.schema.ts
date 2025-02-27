import {
  pgTable,
  text,
  timestamp,
  boolean,
  jsonb,
  uuid
} from 'drizzle-orm/pg-core'
import { users } from './users.schema'
import { timestamps } from './column.helpers'

export const userConsent = pgTable('user_consent', {
  userId: uuid('user_id')
    .references(() => users.id)
    .primaryKey(),
  // Essential cookies are always enabled
  analytics: boolean('analytics').notNull().default(false),
  social: boolean('social').notNull().default(false),
  advertising: boolean('advertising').notNull().default(false),
  ...timestamps
})

export const userActivity = pgTable('user_activity', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  action: text('action').notNull(),
  metadata: jsonb('metadata').notNull().default({}),
  ...timestamps
})
