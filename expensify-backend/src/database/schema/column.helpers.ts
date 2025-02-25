import { timestamp } from 'drizzle-orm/pg-core'
import { createSchemaFactory } from 'drizzle-zod'

export const timestamps = {
  updatedAt: timestamp('updated_at', {
    mode: 'date'
  }),
  createdAt: timestamp('created_at', {
    mode: 'date'
  })
    .defaultNow()
    .notNull(),
  deletedAt: timestamp('deleted_at', {
    mode: 'date'
  })
}

export const { createInsertSchema, createSelectSchema, createUpdateSchema } =
  createSchemaFactory({
    // This configuration will only coerce dates. Set `coerce` to `true` to coerce all data types or specify others
    coerce: {
      date: true
    }
  })
