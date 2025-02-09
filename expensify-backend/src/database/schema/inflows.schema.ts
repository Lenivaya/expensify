import {
  InferSelectModel,
  relations,
  sql
} from 'drizzle-orm'
import {
  numeric,
  pgTable,
  text,
  uuid
} from 'drizzle-orm/pg-core'
import { timestamps } from './column.helpers'
import { users } from './users.schema'
import {
  createSelectSchema,
  createInsertSchema
} from 'drizzle-zod'

export const inflows = pgTable('inflows', {
  id: uuid('id').primaryKey().defaultRandom(),
  amount: numeric().notNull(),
  description: text('description').default(''),
  tags: text('tags')
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),

  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  ...timestamps
})
export type Inflow = InferSelectModel<typeof inflows>
export const inflowSelectSchema =
  createSelectSchema(inflows)
export const expesneInsertSchema =
  createInsertSchema(inflows)

export const inflowsRelations = relations(
  inflows,
  ({ one }) => ({
    user: one(users, {
      fields: [inflows.userId],
      references: [users.id]
    })
  })
)
