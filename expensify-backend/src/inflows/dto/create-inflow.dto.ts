import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator'

/**
 * Data Transfer Object for creating a new inflow record.
 * Contains all required fields for creating an inflow entry in the system.
 *
 * @description
 * This DTO validates and transfers data for creating new income entries.
 * All fields are required and must pass validation before the inflow can be created.
 *
 * @example
 * {
 *   amount: 2500.0,
 *   description: 'Monthly salary',
 *   tags: ['salary', 'work']
 * }
 */
export class CreateInflowDto {
  /**
   * The monetary amount of the inflow transaction.
   * Must be a positive number greater than 0.01.
   *
   * @minimum 0.01
   * @type {number}
   * @required
   * @example 2500.0
   */
  @ApiProperty({
    description:
      "The monetary amount of the inflow in the system's default currency",
    example: 2500.0,
    minimum: 0.01,
    type: Number
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number

  /**
   * A descriptive text explaining the source or purpose of the inflow.
   * Used to provide context and help with record keeping.
   *
   * @minLength 3
   * @maxLength 255
   * @type {string}
   * @required
   * @example "Monthly salary"
   */
  @ApiProperty({
    description:
      'A clear description explaining the source or purpose of the inflow',
    example: 'Monthly salary',
    minLength: 3,
    maxLength: 255,
    type: String
  })
  @IsString()
  @IsNotEmpty()
  description: string

  /**
   * Array of tags used to categorize and organize the inflow.
   * Must contain at least one tag. Each tag must be a non-empty string.
   * Tags help with filtering and organizing inflows by categories.
   *
   * @type {string[]}
   * @required
   * @minItems 1
   * @example ['salary', 'work']
   */
  @ApiProperty({
    description: 'List of tags for categorizing and organizing the inflow',
    example: ['salary', 'work'],
    type: [String],
    isArray: true,
    minItems: 1
  })
  @IsArray()
  @IsString({ each: true })
  tags: string[]
}
