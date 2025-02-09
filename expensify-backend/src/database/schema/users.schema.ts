import { InferSelectModel, relations } from 'drizzle-orm'
import { pgTable, text, uuid } from 'drizzle-orm/pg-core'
import { timestamps } from './column.helpers'
import { expenses } from './expenses.schema'
import { inflows } from './inflows.schema'
import {
  createInsertSchema,
  createSelectSchema
} from 'drizzle-zod'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: text('username').notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  ...timestamps
})
export type User = InferSelectModel<typeof users>

export const userSelectSchema = createSelectSchema(
  users
).omit({ password: true })
export const userInsertSchema = createInsertSchema(users)

export const userRelations = relations(
  users,
  ({ many }) => ({
    expenses: many(expenses),
    inflows: many(inflows)
  })
)
