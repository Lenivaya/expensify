import { createZodDto } from 'nestjs-zod'
import { inflowSelectSchema } from 'src/database/schema/inflows.schema'

/**
 * Data Transfer Object representing a complete inflow record.
 *
 * @description
 * This DTO extends the Zod schema from the database to provide complete type safety
 * and validation for inflow records. It represents the full shape of an inflow
 * including system-generated fields like ID and timestamps.
 *
 * @property {string} id - Unique identifier for the inflow record (UUID v4 format)
 * @property {number} amount - The monetary value of the inflow (minimum: 0.01)
 * @property {string} description - Detailed explanation of the inflow (3-255 characters)
 * @property {string[]} tags - Array of categorization tags (minimum: 1 tag)
 * @property {Date} createdAt - ISO 8601 timestamp of when the record was created
 * @property {Date} updatedAt - ISO 8601 timestamp of the last update to the record
 *
 * @example
 * {
 *   id: 'clf12345-6789-abcd-efgh-ijklmnopqrst',
 *   amount: 2500.0,
 *   description: 'Monthly salary',
 *   tags: ['salary', 'work'],
 *   createdAt: '2024-02-26T10:00:00.000Z',
 *   updatedAt: '2024-02-26T10:00:00.000Z'
 * }
 */
export class InflowDto extends createZodDto(inflowSelectSchema) {}
