# Class: MonthlyStats

Data Transfer Object for monthly statistics aggregation.

## Description

This DTO represents aggregated statistics for a specific month,
including count of occurrences and total value. Used for generating
monthly reports and analytics across the application.

## Example

```ts
{
 *   month: 2, // February
 *   count: 15,
 *   total: 2500.50
 * }
```

## Constructors

### new MonthlyStats()

> **new MonthlyStats**(): [`MonthlyStats`](MonthlyStats.md)

#### Returns

[`MonthlyStats`](MonthlyStats.md)

## Properties

### month

> **month**: `number`

The month number (1-12) for which statistics are calculated.
1 represents January, 12 represents December.

#### Minimum

1

#### Maximum

12

#### Required

#### Example

```ts
2
```

***

### count

> **count**: `number`

Number of records or occurrences in this month.
Represents how many times an event or transaction occurred.

#### Minimum

0

#### Required

#### Example

```ts
15
```

***

### total

> **total**: `number`

Total monetary value or sum for the month.
For expenses, this represents total spending.
For inflows, this represents total income.

#### Minimum

0

#### Required

#### Example

```ts
2500.50
```
