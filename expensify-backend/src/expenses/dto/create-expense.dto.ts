import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator'

/**
 * Data Transfer Object for creating a new expense record.
 * Contains all required fields for creating an expense entry in the system.
 *
 * @description
 * This DTO validates and transfers data for creating new expense entries.
 * All fields are required and must pass validation before the expense can be created.
 *
 * @example
 * {
 *   amount: 29.99,
 *   description: 'Grocery shopping',
 *   tags: ['food', 'groceries']
 * }
 */
export class CreateExpenseDto {
  /**
   * The monetary amount of the expense transaction.
   * Must be a positive number greater than 0.01.
   *
   * @minimum 0.01
   * @type {number}
   * @required
   * @example 29.99
   */
  @ApiProperty({
    description: "The monetary amount spent in the system's default currency",
    example: 29.99,
    minimum: 0.01,
    type: Number
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number

  /**
   * A descriptive text explaining the purpose or nature of the expense.
   * Used to provide context and help with expense tracking.
   *
   * @minLength 3
   * @maxLength 255
   * @type {string}
   * @required
   * @example "Grocery shopping"
   */
  @ApiProperty({
    description: 'A clear description explaining the purpose of the expense',
    example: 'Grocery shopping',
    minLength: 3,
    maxLength: 255,
    type: String
  })
  @IsString()
  @IsNotEmpty()
  description: string

  /**
   * Array of tags used to categorize and organize the expense.
   * Must contain at least one tag. Each tag must be a non-empty string.
   * Tags help with filtering and organizing expenses by categories.
   *
   * @type {string[]}
   * @required
   * @minItems 1
   * @example ['food', 'groceries']
   */
  @ApiProperty({
    description: 'List of tags for categorizing and organizing the expense',
    example: ['food', 'groceries'],
    type: [String],
    isArray: true,
    minItems: 1
  })
  @IsArray()
  @IsString({ each: true })
  tags: string[]
}
