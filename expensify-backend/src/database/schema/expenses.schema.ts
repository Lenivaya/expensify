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
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
  timestamps
} from './column.helpers'
import { users } from './users.schema'
import { z } from '@nest-zod/z'
import { inflows } from './inflows.schema'

export const expenses = pgTable('expenses', {
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
export type Expense = InferSelectModel<typeof expenses>

export const expenseSelectSchema = createSelectSchema(
  expenses,
  {
    createdAt: z.dateString().cast(),
    updatedAt: z.dateString().cast().nullable(),
    deletedAt: z.dateString().cast().nullable()
  }
)
export const expesneInsertSchema = createInsertSchema(
  expenses
).omit({
  createdAt: true,
  updatedAt: true,
  deletedAt: true
})

export const expesneUpdateSchema = createUpdateSchema(
  inflows
).omit({
  createdAt: true,
  updatedAt: true,
  deletedAt: true
})

export const expensesRelations = relations(
  expenses,
  ({ one }) => ({
    user: one(users, {
      fields: [expenses.userId],
      references: [users.id]
    })
  })
)
