import { InferSelectModel, relations } from 'drizzle-orm'
import { pgTable, text, uuid } from 'drizzle-orm/pg-core'
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
  timestamps
} from './column.helpers'
import { expenses } from './expenses.schema'
import { inflows } from './inflows.schema'
import { z } from '@nest-zod/z'

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

export const userSelectSchema = createSelectSchema(users, {
  createdAt: z.dateString().cast(),
  updatedAt: z.dateString().cast().nullable(),
  deletedAt: z.dateString().cast().nullable()
}).omit({ password: true })
export const userInsertSchema = createInsertSchema(
  users
).omit({
  createdAt: true,
  updatedAt: true,
  deletedAt: true
})
export const userUpdateSchema = createUpdateSchema(
  users
).omit({
  password: true,
  username: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true
})

export const userRelations = relations(
  users,
  ({ many }) => ({
    expenses: many(expenses),
    inflows: many(inflows)
  })
)
