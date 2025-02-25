export type FinanicalSummaryBalance = {
  /**
   * @description Total amount of all inflows
   * @example 5000.00
   */
  totalInflows: number
  /**
   * @description Total amount of all expenses
   * @example 3000.00
   */
  totalExpenses: number
  /**
   * @description Current balance (inflows - expenses)
   * @example 2000.00
   */
  balance: number
}

export type FinancialStatisticsDto = {
  /**
   * @description Average amount of inflows
   * @example 1000.00
   */
  averageInflow: number
  /**
   * @description Average amount of expenses
   * @example 800.00
   */
  averageExpense: number
  /**
   * @description Total number of inflow transactions
   * @example 25
   */
  totalInflowCount: number
  /**
   * @description Total number of expense transactions
   * @example 50
   */
  totalExpenseCount: number
}

export type FinancialSummaryDto = {
  currentBalance: FinanicalSummaryBalance
  statistics: FinancialStatisticsDto
}
