import { createZodDto } from 'nestjs-zod'
import { expenseSelectSchema } from 'src/database/schema/expenses.schema'

/**
 * Data Transfer Object representing a complete expense record.
 *
 * @description
 * This DTO extends the Zod schema from the database to provide complete type safety
 * and validation for expense records. It represents the full shape of an expense
 * including system-generated fields like ID and timestamps.
 *
 * @property {string} id - Unique identifier for the expense record (UUID v4 format)
 * @property {number} amount - The monetary value of the expense (minimum: 0.01)
 * @property {string} description - Detailed explanation of the expense (3-255 characters)
 * @property {string[]} tags - Array of categorization tags (minimum: 1 tag)
 * @property {Date} createdAt - ISO 8601 timestamp of when the record was created
 * @property {Date} updatedAt - ISO 8601 timestamp of the last update to the record
 *
 * @example
 * {
 *   id: 'clf12345-6789-abcd-efgh-ijklmnopqrst',
 *   amount: 29.99,
 *   description: 'Grocery shopping',
 *   tags: ['food', 'groceries'],
 *   createdAt: '2024-02-26T10:00:00.000Z',
 *   updatedAt: '2024-02-26T10:00:00.000Z'
 * }
 */
export class ExpenseDto extends createZodDto(expenseSelectSchema) {}
