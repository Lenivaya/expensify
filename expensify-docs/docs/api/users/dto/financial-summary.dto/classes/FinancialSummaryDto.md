# Class: FinancialSummaryDto

Comprehensive financial summary Data Transfer Object.
Combines current balance information with detailed statistical analysis
to provide a complete overview of a user's financial status.

## Example

```ts
{
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
```

## Constructors

### new FinancialSummaryDto()

> **new FinancialSummaryDto**(): [`FinancialSummaryDto`](FinancialSummaryDto.md)

#### Returns

[`FinancialSummaryDto`](FinancialSummaryDto.md)

## Properties

### currentBalance

> **currentBalance**: [`BalanceDto`](../../balance.dto/classes/BalanceDto.md)

Current balance information including total inflows, expenses, and net balance.
Provides the current financial position of the user.

***

### statistics

> **statistics**: [`FinancialStatisticsDto`](FinancialStatisticsDto.md)

Detailed statistical analysis of financial transactions.
Includes averages and transaction counts for both inflows and expenses.
