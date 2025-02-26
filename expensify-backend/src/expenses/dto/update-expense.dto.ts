import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'

/**
 * Data Transfer Object for updating an existing expense record.
 *
 * @description
 * This DTO handles partial updates of expense records. All fields are optional,
 * allowing for updating only specific fields while leaving others unchanged.
 * Each provided field must still pass validation before the update is processed.
 *
 * @example
 * // Update just the amount
 * {
 *   amount: 35.50
 * }
 *
 * // Update multiple fields
 * {
 *   amount: 35.50,
 *   description: 'Updated grocery list with extra items',
 *   tags: ['food', 'groceries', 'household']
 * }
 */
export class UpdateExpenseDto {
  /**
   * The new monetary amount to set for the expense transaction.
   * When provided, must be a positive number greater than 0.01.
   *
   * @minimum 0.01
   * @type {number}
   * @optional
   * @example 35.50
   */
  @ApiProperty({
    description:
      "The new monetary amount spent in the system's default currency",
    example: 35.5,
    required: false,
    minimum: 0.01,
    type: Number
  })
  @IsNumber()
  @IsOptional()
  amount?: number

  /**
   * The new description to set for the expense.
   * When provided, must be between 3 and 255 characters.
   * Used to update the context or explanation of the expense.
   *
   * @minLength 3
   * @maxLength 255
   * @type {string}
   * @optional
   * @example "Updated grocery list with extra items"
   */
  @ApiProperty({
    description: 'Updated description explaining the purpose of the expense',
    example: 'Updated grocery list with extra items',
    required: false,
    minLength: 3,
    maxLength: 255,
    type: String
  })
  @IsString()
  @IsOptional()
  description?: string

  /**
   * The new array of tags to set for the expense.
   * When provided, must contain at least one tag.
   * Each tag must be a non-empty string.
   * Used to update the categorization of the expense.
   *
   * @type {string[]}
   * @optional
   * @minItems 1
   * @example ['food', 'groceries', 'household']
   */
  @ApiProperty({
    description:
      'Updated list of tags for categorizing and organizing the expense',
    example: ['food', 'groceries', 'household'],
    type: [String],
    required: false,
    isArray: true,
    minItems: 1
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[]
}
