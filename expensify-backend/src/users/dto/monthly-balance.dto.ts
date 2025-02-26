import { ApiProperty } from '@nestjs/swagger'

/**
 * Data Transfer Object representing a user's financial balance for a specific month.
 *
 * This DTO provides a summary of a user's financial activity for a single month,
 * including total inflows (income), total expenses, and the resulting balance.
 * All monetary values are represented as strings with two decimal places to preserve precision.
 *
 * @example
 * {
 *   month: 3,
 *   inflow: "1500.00",
 *   expense: "1200.00",
 *   balance: "300.00"
 * }
 */
export class MonthlyBalanceDto {
  /**
   * The month number of the balance record.
   * Values range from 1 (January) to 12 (December).
   *
   * @example 3 // March
   * @minimum 1
   * @maximum 12
   */
  @ApiProperty({
    description: 'Month number (1-12)',
    example: 1
  })
  month: number

  /**
   * Total monetary inflows for the specified month.
   * Includes all income, deposits, and positive cash flows.
   * Represented as a string to preserve decimal precision.
   *
   * @example "1000.00"
   */
  @ApiProperty({
    description: 'Total inflows for the month',
    example: '1000.00'
  })
  inflow: string

  /**
   * Total monetary expenses for the specified month.
   * Includes all spending, withdrawals, and negative cash flows.
   * Represented as a string to preserve decimal precision.
   *
   * @example "800.00"
   */
  @ApiProperty({
    description: 'Total expenses for the month',
    example: '800.00'
  })
  expense: string

  /**
   * Net balance for the specified month.
   * Calculated as (inflows - expenses) for the month.
   * Positive values indicate net savings, negative values indicate net deficit.
   * Represented as a string to preserve decimal precision.
   *
   * @example "200.00"
   */
  @ApiProperty({
    description: 'Balance for the month',
    example: '200.00'
  })
  balance: string
}
