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
  createInsertSchema,
  createSelectSchema
} from 'drizzle-zod'

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

export const expenseSelectSchema =
  createSelectSchema(expenses)
export const expesneInsertSchema =
  createInsertSchema(expenses)

export const expensesRelations = relations(
  expenses,
  ({ one }) => ({
    user: one(users, {
      fields: [expenses.userId],
      references: [users.id]
    })
  })
)
