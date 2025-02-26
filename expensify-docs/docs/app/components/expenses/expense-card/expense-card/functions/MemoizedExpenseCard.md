# Function: MemoizedExpenseCard()

> **MemoizedExpenseCard**(`props`): `ReactNode`

A memoized version of the ExpenseCard component for use in lists

## Parameters

### props

[`ExpenseCardProps`](../interfaces/ExpenseCardProps.md)

## Returns

`ReactNode`

## Description

This version of the component is wrapped in React.memo to prevent unnecessary
re-renders when used in a list context. It should be used when the component
is rendered as part of a list where parent components might frequently re-render.

## Example

```tsx
const expenseList = expenses.map(expense => (
  <MemoizedExpenseCard
    key={expense.id}
    expense={expense}
    // ... other props
  />
))
```
