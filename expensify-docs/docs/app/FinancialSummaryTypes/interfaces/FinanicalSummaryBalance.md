# Interface: FinanicalSummaryBalance

Represents the current financial balance state of a user
 FinanicalSummaryBalance

## Properties

### totalInflows

> **totalInflows**: `number`

Total amount of all inflows (income, deposits, etc.)

#### Description

Represents the sum of all positive financial transactions

#### Example

```ts
5000.00
```

***

### totalExpenses

> **totalExpenses**: `number`

Total amount of all expenses (purchases, bills, etc.)

#### Description

Represents the sum of all negative financial transactions

#### Example

```ts
3000.00
```

***

### balance

> **balance**: `number`

Current net balance (inflows - expenses)

#### Description

The difference between total inflows and total expenses

#### Example

```ts
2000.00
```
