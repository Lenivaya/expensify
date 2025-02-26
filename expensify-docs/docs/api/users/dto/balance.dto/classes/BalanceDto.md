# Class: BalanceDto

Data Transfer Object representing a user's overall financial balance summary.

This DTO provides a comprehensive overview of a user's financial status,
including total inflows (income), total expenses, and the resulting balance.
All monetary values are represented as numbers with two decimal places.

## Example

```ts
{
 *   totalInflows: 5000.00,
 *   totalExpenses: 3000.00,
 *   balance: 2000.00
 * }
```

## Constructors

### new BalanceDto()

> **new BalanceDto**(): [`BalanceDto`](BalanceDto.md)

#### Returns

[`BalanceDto`](BalanceDto.md)

## Properties

### totalInflows

> **totalInflows**: `number`

The sum of all monetary inflows recorded for the user.
Includes all income, deposits, and positive cash flows since account creation.
Always represented as a non-negative number with two decimal places.

#### Example

```ts
5000.00
```

#### Minimum

0

***

### totalExpenses

> **totalExpenses**: `number`

The sum of all monetary expenses recorded for the user.
Includes all spending, withdrawals, and negative cash flows since account creation.
Always represented as a non-negative number with two decimal places.

#### Example

```ts
3000.00
```

#### Minimum

0

***

### balance

> **balance**: `number`

The current net balance calculated as (totalInflows - totalExpenses).
Represents the user's overall financial position.
Can be positive (net savings) or negative (net deficit).
Represented as a number with two decimal places.

#### Example

```ts
2000.00
```
