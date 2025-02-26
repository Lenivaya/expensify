# Class: FinancialStatisticsDto

Data Transfer Object for financial statistics.
Provides detailed statistical analysis of a user's financial transactions,
including both per-transaction and monthly aggregated metrics.

## Example

```ts
{
 *   averageInflow: 1000.00,
 *   averageExpense: 800.00,
 *   averageMonthlyInflow: 3000.00,
 *   averageMonthlyExpense: 2400.00,
 *   totalInflowCount: 25,
 *   totalExpenseCount: 50
 * }
```

## Constructors

### new FinancialStatisticsDto()

> **new FinancialStatisticsDto**(): [`FinancialStatisticsDto`](FinancialStatisticsDto.md)

#### Returns

[`FinancialStatisticsDto`](FinancialStatisticsDto.md)

## Properties

### averageInflow

> **averageInflow**: `number`

Average amount per individual inflow transaction.
Calculated as (total inflow amount / number of inflow transactions).
Provides insight into typical income transaction size.

#### Example

```ts
1000.00
```

#### Minimum

0

***

### averageExpense

> **averageExpense**: `number`

Average amount per individual expense transaction.
Calculated as (total expense amount / number of expense transactions).
Provides insight into typical spending transaction size.

#### Example

```ts
800.00
```

#### Minimum

0

***

### averageMonthlyInflow

> **averageMonthlyInflow**: `number`

Average total inflows per month.
Calculated by first summing inflows per month, then averaging across months.
Provides insight into typical monthly income.

#### Example

```ts
3000.00
```

#### Minimum

0

***

### averageMonthlyExpense

> **averageMonthlyExpense**: `number`

Average total expenses per month.
Calculated by first summing expenses per month, then averaging across months.
Provides insight into typical monthly spending.

#### Example

```ts
2400.00
```

#### Minimum

0

***

### totalInflowCount

> **totalInflowCount**: `number`

Total count of all inflow transactions.
Represents the number of income/deposit transactions recorded.
Used for statistical calculations and transaction history analysis.

#### Example

```ts
25
```

#### Minimum

0

***

### totalExpenseCount

> **totalExpenseCount**: `number`

Total count of all expense transactions.
Represents the number of expense/withdrawal transactions recorded.
Used for statistical calculations and transaction history analysis.

#### Example

```ts
50
```

#### Minimum

0
