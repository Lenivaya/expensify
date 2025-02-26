import { ApiProperty } from '@nestjs/swagger'
import { BalanceDto } from './balance.dto'

/**
 * Data Transfer Object for financial statistics.
 * Provides detailed statistical analysis of a user's financial transactions,
 * including both per-transaction and monthly aggregated metrics.
 *
 * @example
 * {
 *   averageInflow: 1000.00,
 *   averageExpense: 800.00,
 *   averageMonthlyInflow: 3000.00,
 *   averageMonthlyExpense: 2400.00,
 *   totalInflowCount: 25,
 *   totalExpenseCount: 50
 * }
 */
export class FinancialStatisticsDto {
  /**
   * Average amount per individual inflow transaction.
   * Calculated as (total inflow amount / number of inflow transactions).
   * Provides insight into typical income transaction size.
   *
   * @example 1000.00
   * @minimum 0
   */
  @ApiProperty({
    description: 'Average amount per inflow transaction',
    example: 1000.0,
    minimum: 0,
    type: Number
  })
  averageInflow: number

  /**
   * Average amount per individual expense transaction.
   * Calculated as (total expense amount / number of expense transactions).
   * Provides insight into typical spending transaction size.
   *
   * @example 800.00
   * @minimum 0
   */
  @ApiProperty({
    description: 'Average amount per expense transaction',
    example: 800.0,
    minimum: 0,
    type: Number
  })
  averageExpense: number

  /**
   * Average total inflows per month.
   * Calculated by first summing inflows per month, then averaging across months.
   * Provides insight into typical monthly income.
   *
   * @example 3000.00
   * @minimum 0
   */
  @ApiProperty({
    description: 'Average total inflows per month',
    example: 1000.0,
    minimum: 0,
    type: Number
  })
  averageMonthlyInflow: number

  /**
   * Average total expenses per month.
   * Calculated by first summing expenses per month, then averaging across months.
   * Provides insight into typical monthly spending.
   *
   * @example 2400.00
   * @minimum 0
   */
  @ApiProperty({
    description: 'Average total expenses per month',
    example: 800.0,
    minimum: 0,
    type: Number
  })
  averageMonthlyExpense: number

  /**
   * Total count of all inflow transactions.
   * Represents the number of income/deposit transactions recorded.
   * Used for statistical calculations and transaction history analysis.
   *
   * @example 25
   * @minimum 0
   */
  @ApiProperty({
    description: 'Total number of inflow transactions',
    example: 25,
    minimum: 0,
    type: Number
  })
  totalInflowCount: number

  /**
   * Total count of all expense transactions.
   * Represents the number of expense/withdrawal transactions recorded.
   * Used for statistical calculations and transaction history analysis.
   *
   * @example 50
   * @minimum 0
   */
  @ApiProperty({
    description: 'Total number of expense transactions',
    example: 50,
    minimum: 0,
    type: Number
  })
  totalExpenseCount: number
}

/**
 * Comprehensive financial summary Data Transfer Object.
 * Combines current balance information with detailed statistical analysis
 * to provide a complete overview of a user's financial status.
 *
 * @example
 * {
 *   currentBalance: {
 *     totalInflows: 5000.00,
 *     totalExpenses: 3000.00,
 *     balance: 2000.00
 *   },
 *   statistics: {
 *     averageInflow: 1000.00,
 *     averageExpense: 800.00,
 *     averageMonthlyInflow: 3000.00,
 *     averageMonthlyExpense: 2400.00,
 *     totalInflowCount: 25,
 *     totalExpenseCount: 50
 *   }
 * }
 */
export class FinancialSummaryDto {
  /**
   * Current balance information including total inflows, expenses, and net balance.
   * Provides the current financial position of the user.
   */
  @ApiProperty({
    description: 'Current balance information',
    type: BalanceDto
  })
  currentBalance: BalanceDto

  /**
   * Detailed statistical analysis of financial transactions.
   * Includes averages and transaction counts for both inflows and expenses.
   */
  @ApiProperty({
    description: 'Statistical analysis of financial transactions',
    type: FinancialStatisticsDto
  })
  statistics: FinancialStatisticsDto
}
