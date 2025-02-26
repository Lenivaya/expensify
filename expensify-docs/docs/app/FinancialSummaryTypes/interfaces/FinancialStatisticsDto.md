# Interface: FinancialStatisticsDto

Statistical metrics about a user's financial activity
 FinancialStatisticsDto

## Properties

### averageInflow

> **averageInflow**: `number`

Average amount per inflow transaction

#### Description

Calculated as total inflows divided by number of inflow transactions

#### Example

```ts
1000.00
```

***

### averageExpense

> **averageExpense**: `number`

Average amount per expense transaction

#### Description

Calculated as total expenses divided by number of expense transactions

#### Example

```ts
800.00
```

***

### totalInflowCount

> **totalInflowCount**: `number`

Total count of inflow transactions

#### Description

Number of positive financial transactions recorded

#### Example

```ts
25
```

***

### totalExpenseCount

> **totalExpenseCount**: `number`

Total count of expense transactions

#### Description

Number of negative financial transactions recorded

#### Example

```ts
50
```
