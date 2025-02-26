import { ApiProperty } from '@nestjs/swagger'

/**
 * Data Transfer Object representing a user's overall financial balance summary.
 *
 * This DTO provides a comprehensive overview of a user's financial status,
 * including total inflows (income), total expenses, and the resulting balance.
 * All monetary values are represented as numbers with two decimal places.
 *
 * @example
 * {
 *   totalInflows: 5000.00,
 *   totalExpenses: 3000.00,
 *   balance: 2000.00
 * }
 */
export class BalanceDto {
  /**
   * The sum of all monetary inflows recorded for the user.
   * Includes all income, deposits, and positive cash flows since account creation.
   * Always represented as a non-negative number with two decimal places.
   *
   * @example 5000.00
   * @minimum 0
   */
  @ApiProperty({
    description: 'Total amount of all inflows',
    example: 5000.0,
    minimum: 0,
    type: Number
  })
  totalInflows: number

  /**
   * The sum of all monetary expenses recorded for the user.
   * Includes all spending, withdrawals, and negative cash flows since account creation.
   * Always represented as a non-negative number with two decimal places.
   *
   * @example 3000.00
   * @minimum 0
   */
  @ApiProperty({
    description: 'Total amount of all expenses',
    example: 3000.0,
    minimum: 0,
    type: Number
  })
  totalExpenses: number

  /**
   * The current net balance calculated as (totalInflows - totalExpenses).
   * Represents the user's overall financial position.
   * Can be positive (net savings) or negative (net deficit).
   * Represented as a number with two decimal places.
   *
   * @example 2000.00
   */
  @ApiProperty({
    description: 'Current balance (totalInflows - totalExpenses)',
    example: 2000.0,
    type: Number
  })
  balance: number
}
