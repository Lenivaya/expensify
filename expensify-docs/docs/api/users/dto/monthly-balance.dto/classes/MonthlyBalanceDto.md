# Class: MonthlyBalanceDto

Data Transfer Object representing a user's financial balance for a specific month.

This DTO provides a summary of a user's financial activity for a single month,
including total inflows (income), total expenses, and the resulting balance.
All monetary values are represented as strings with two decimal places to preserve precision.

## Example

```ts
{
 *   month: 3,
 *   inflow: "1500.00",
 *   expense: "1200.00",
 *   balance: "300.00"
 * }
```

## Constructors

### new MonthlyBalanceDto()

> **new MonthlyBalanceDto**(): [`MonthlyBalanceDto`](MonthlyBalanceDto.md)

#### Returns

[`MonthlyBalanceDto`](MonthlyBalanceDto.md)

## Properties

### month

> **month**: `number`

The month number of the balance record.
Values range from 1 (January) to 12 (December).

#### Example

```ts
3 // March
```

#### Minimum

1

#### Maximum

12

***

### inflow

> **inflow**: `string`

Total monetary inflows for the specified month.
Includes all income, deposits, and positive cash flows.
Represented as a string to preserve decimal precision.

#### Example

```ts
"1000.00"
```

***

### expense

> **expense**: `string`

Total monetary expenses for the specified month.
Includes all spending, withdrawals, and negative cash flows.
Represented as a string to preserve decimal precision.

#### Example

```ts
"800.00"
```

***

### balance

> **balance**: `string`

Net balance for the specified month.
Calculated as (inflows - expenses) for the month.
Positive values indicate net savings, negative values indicate net deficit.
Represented as a string to preserve decimal precision.

#### Example

```ts
"200.00"
```
