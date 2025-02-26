# Class: BalanceHistoryItemDto

Data transfer object representing a balance history record for a specific month.
Used to track financial metrics like inflows, expenses and balances over time.
This DTO provides a comprehensive view of a user's financial status for a given month,
including both periodic and cumulative financial metrics.

## Constructors

### new BalanceHistoryItemDto()

> **new BalanceHistoryItemDto**(): [`BalanceHistoryItemDto`](BalanceHistoryItemDto.md)

#### Returns

[`BalanceHistoryItemDto`](BalanceHistoryItemDto.md)

## Properties

### year

> **year**: `number`

The calendar year of the balance record.
Represents the year component of the period being analyzed.
Must be a valid four-digit year number.

#### Example

```ts
2024
```

***

### month

> **month**: `number`

The month number of the balance record.
Represents the month component of the period being analyzed.
Values range from 1 (January) to 12 (December).

#### Example

```ts
3 // March
```

***

### inflow

> **inflow**: `string`

Total monetary inflows for the specified month.
Includes all income, deposits, and positive cash flows.
Represented as a string to preserve decimal precision.
Format: Decimal number with two decimal places.

#### Example

```ts
"1500.00"
```

***

### expense

> **expense**: `string`

Total monetary expenses for the specified month.
Includes all spending, withdrawals, and negative cash flows.
Represented as a string to preserve decimal precision.
Format: Decimal number with two decimal places.

#### Example

```ts
"1200.00"
```

***

### balance

> **balance**: `string`

Net balance for the specified month.
Calculated as (inflows - expenses) for the period.
Positive values indicate net savings, negative values indicate net spending.
Represented as a string to preserve decimal precision.
Format: Decimal number with two decimal places.

#### Example

```ts
"300.00"
```

***

### cumulativeBalance

> **cumulativeBalance**: `string`

Running total of all balances up to and including this month.
Represents the total accumulated balance from the start of tracking.
Useful for tracking long-term financial growth or decline.
Represented as a string to preserve decimal precision.
Format: Decimal number with two decimal places.

#### Example

```ts
"2500.00"
```
