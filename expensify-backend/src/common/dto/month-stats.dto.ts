import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'

/**
 * Data Transfer Object for monthly statistics aggregation.
 *
 * @description
 * This DTO represents aggregated statistics for a specific month,
 * including count of occurrences and total value. Used for generating
 * monthly reports and analytics across the application.
 *
 * @example
 * {
 *   month: 2, // February
 *   count: 15,
 *   total: 2500.50
 * }
 */
@Exclude()
export class MonthlyStats {
  /**
   * The month number (1-12) for which statistics are calculated.
   * 1 represents January, 12 represents December.
   *
   * @type {number}
   * @minimum 1
   * @maximum 12
   * @required
   * @example 2
   */
  @Expose()
  @ApiProperty({
    description: 'Month number (1-12)',
    minimum: 1,
    maximum: 12,
    example: 2
  })
  @IsNotEmpty()
  month: number

  /**
   * Number of records or occurrences in this month.
   * Represents how many times an event or transaction occurred.
   *
   * @type {number}
   * @minimum 0
   * @required
   * @example 15
   */
  @Expose()
  @ApiProperty({
    description: 'Number of records in this month',
    minimum: 0,
    example: 15
  })
  @IsNotEmpty()
  count: number

  /**
   * Total monetary value or sum for the month.
   * For expenses, this represents total spending.
   * For inflows, this represents total income.
   *
   * @type {number}
   * @minimum 0
   * @required
   * @example 2500.50
   */
  @Expose()
  @ApiProperty({
    description: 'Total monetary value for the month',
    minimum: 0,
    example: 2500.5
  })
  @IsNotEmpty()
  total: number
}
