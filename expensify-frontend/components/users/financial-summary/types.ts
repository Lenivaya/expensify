/**
 * @description
 * Type definitions for the financial summary components. These types represent
 * the core data structures used across the financial summary feature, including
 * balance information, statistics, and DTOs for API communication.
 */

/**
 * Represents the current financial balance state of a user
 * @interface FinanicalSummaryBalance
 */
export type FinanicalSummaryBalance = {
  /**
   * Total amount of all inflows (income, deposits, etc.)
   * @type {number}
   * @description Represents the sum of all positive financial transactions
   * @example 5000.00
   */
  totalInflows: number

  /**
   * Total amount of all expenses (purchases, bills, etc.)
   * @type {number}
   * @description Represents the sum of all negative financial transactions
   * @example 3000.00
   */
  totalExpenses: number

  /**
   * Current net balance (inflows - expenses)
   * @type {number}
   * @description The difference between total inflows and total expenses
   * @example 2000.00
   */
  balance: number
}

/**
 * Statistical metrics about a user's financial activity
 * @interface FinancialStatisticsDto
 */
export type FinancialStatisticsDto = {
  /**
   * Average amount per inflow transaction
   * @type {number}
   * @description Calculated as total inflows divided by number of inflow transactions
   * @example 1000.00
   */
  averageInflow: number

  /**
   * Average amount per expense transaction
   * @type {number}
   * @description Calculated as total expenses divided by number of expense transactions
   * @example 800.00
   */
  averageExpense: number

  /**
   * Total count of inflow transactions
   * @type {number}
   * @description Number of positive financial transactions recorded
   * @example 25
   */
  totalInflowCount: number

  /**
   * Total count of expense transactions
   * @type {number}
   * @description Number of negative financial transactions recorded
   * @example 50
   */
  totalExpenseCount: number
}

/**
 * Complete financial summary data transfer object
 * @interface FinancialSummaryDto
 * @description
 * Combines current balance information with statistical metrics to provide
 * a comprehensive view of a user's financial state
 */
export type FinancialSummaryDto = {
  /**
   * Current balance information
   * @type {FinanicalSummaryBalance}
   */
  currentBalance: FinanicalSummaryBalance

  /**
   * Statistical metrics
   * @type {FinancialStatisticsDto}
   */
  statistics: FinancialStatisticsDto
}
