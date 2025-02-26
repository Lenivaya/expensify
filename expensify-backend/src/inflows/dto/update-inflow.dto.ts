import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'

/**
 * Data Transfer Object for updating an existing inflow record.
 *
 * @description
 * This DTO handles partial updates of inflow records. All fields are optional,
 * allowing for updating only specific fields while leaving others unchanged.
 * Each provided field must still pass validation before the update is processed.
 *
 * @example
 * // Update just the amount
 * {
 *   amount: 3000.0
 * }
 *
 * // Update multiple fields
 * {
 *   amount: 3000.0,
 *   description: 'Updated salary amount',
 *   tags: ['salary', 'bonus']
 * }
 */
export class UpdateInflowDto {
  /**
   * The new monetary amount to set for the inflow transaction.
   * When provided, must be a positive number greater than 0.01.
   *
   * @minimum 0.01
   * @type {number}
   * @optional
   * @example 3000.0
   */
  @ApiProperty({
    description:
      "The new monetary amount for the inflow in the system's default currency",
    example: 2500.0,
    required: false,
    minimum: 0.01,
    type: Number
  })
  @IsNumber()
  @IsOptional()
  amount?: number

  /**
   * The new description to set for the inflow.
   * When provided, must be between 3 and 255 characters.
   * Used to update the context or explanation of the inflow.
   *
   * @minLength 3
   * @maxLength 255
   * @type {string}
   * @optional
   * @example "Monthly salary with performance bonus"
   */
  @ApiProperty({
    description:
      'Updated description explaining the source or purpose of the inflow',
    example: 'Monthly salary with performance bonus',
    required: false,
    minLength: 3,
    maxLength: 255,
    type: String
  })
  @IsString()
  @IsOptional()
  description?: string

  /**
   * The new array of tags to set for the inflow.
   * When provided, must contain at least one tag.
   * Each tag must be a non-empty string.
   * Used to update the categorization of the inflow.
   *
   * @type {string[]}
   * @optional
   * @minItems 1
   * @example ['salary', 'bonus', 'performance']
   */
  @ApiProperty({
    description:
      'Updated list of tags for categorizing and organizing the inflow',
    example: ['salary', 'bonus', 'performance'],
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
