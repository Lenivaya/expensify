# Function: MemoizedExpenseListContainer()

> **MemoizedExpenseListContainer**(`props`): `ReactNode`

A memoized version of the ExpenseListContainer component

## Parameters

### props

[`ExpenseListContainerProps`](../interfaces/ExpenseListContainerProps.md)

## Returns

`ReactNode`

## Description

This version of the component is wrapped in React.memo to prevent unnecessary
re-renders when used in a context where parent components might frequently re-render.

## Example

```tsx
<MemoizedExpenseListContainer
  expenses={expenses}
  onSearch={handleSearch}
  // ... other props
/>
```
