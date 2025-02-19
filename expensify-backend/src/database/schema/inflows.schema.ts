import { type InferSelectModel, relations, sql } from 'drizzle-orm'
import { numeric, pgTable, text, uuid } from 'drizzle-orm/pg-core'
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
  timestamps
} from './column.helpers'
import { users } from './users.schema'
import { z } from '@nest-zod/z'

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
export const inflowSelectSchema = createSelectSchema(inflows, {
  createdAt: z.dateString().cast(),
  updatedAt: z.dateString().cast().nullable(),
  deletedAt: z.dateString().cast().nullable()
})
export const inflowInsertSchema = createInsertSchema(inflows).omit({
  createdAt: true,
  updatedAt: true,
  deletedAt: true
})
export const inflowUpdateSchema = createUpdateSchema(inflows).omit({
  createdAt: true,
  updatedAt: true,
  deletedAt: true
})

export const inflowsRelations = relations(inflows, ({ one }) => ({
  user: one(users, {
    fields: [inflows.userId],
    references: [users.id]
  })
}))
