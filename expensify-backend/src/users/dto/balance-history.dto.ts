import { ApiProperty } from '@nestjs/swagger'

/**
 * Data transfer object representing a balance history record for a specific month.
 * Used to track financial metrics like inflows, expenses and balances over time.
 * This DTO provides a comprehensive view of a user's financial status for a given month,
 * including both periodic and cumulative financial metrics.
 */
export class BalanceHistoryItemDto {
  /**
   * The calendar year of the balance record.
   * Represents the year component of the period being analyzed.
   * Must be a valid four-digit year number.
   * @example 2024
   */
  @ApiProperty({
    description: 'Year of the balance record',
    example: 2024,
    minimum: 1900,
    maximum: 9999
  })
  year: number

  /**
   * The month number of the balance record.
   * Represents the month component of the period being analyzed.
   * Values range from 1 (January) to 12 (December).
   * @example 3 // March
   */
  @ApiProperty({
    description: 'Month of the balance record (1-12)',
    example: 3,
    minimum: 1,
    maximum: 12
  })
  month: number

  /**
   * Total monetary inflows for the specified month.
   * Includes all income, deposits, and positive cash flows.
   * Represented as a string to preserve decimal precision.
   * Format: Decimal number with two decimal places.
   * @example "1500.00"
   */
  @ApiProperty({
    description: 'Total inflows for the period',
    example: '1500.00'
  })
  inflow: string

  /**
   * Total monetary expenses for the specified month.
   * Includes all spending, withdrawals, and negative cash flows.
   * Represented as a string to preserve decimal precision.
   * Format: Decimal number with two decimal places.
   * @example "1200.00"
   */
  @ApiProperty({
    description: 'Total expenses for the period',
    example: '1200.00'
  })
  expense: string

  /**
   * Net balance for the specified month.
   * Calculated as (inflows - expenses) for the period.
   * Positive values indicate net savings, negative values indicate net spending.
   * Represented as a string to preserve decimal precision.
   * Format: Decimal number with two decimal places.
   * @example "300.00"
   */
  @ApiProperty({
    description: 'Net balance for the period (inflows - expenses)',
    example: '300.00'
  })
  balance: string

  /**
   * Running total of all balances up to and including this month.
   * Represents the total accumulated balance from the start of tracking.
   * Useful for tracking long-term financial growth or decline.
   * Represented as a string to preserve decimal precision.
   * Format: Decimal number with two decimal places.
   * @example "2500.00"
   */
  @ApiProperty({
    description: 'Cumulative balance up to this period',
    example: '2500.00'
  })
  cumulativeBalance: string
}
