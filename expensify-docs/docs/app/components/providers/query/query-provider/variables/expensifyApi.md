# Variable: expensifyApi

> `const` **expensifyApi**: `Services`

Configured API client for the Expensify backend

## Description

This client is configured with:
- Automatic token injection from localStorage
- Base URL from environment variables
- Integration with React Query for caching and state management
- Type-safe API operations generated from OpenAPI schema

Features:
- Automatic authentication header injection
- Request/response type safety
- Integrated caching with React Query
- Environment-aware configuration

## Example

```tsx
// Using the API client in a component
const { data, isLoading } = expensifyApi.expenses.getExpenses.useQuery({})

// Making a mutation
const mutation = expensifyApi.expenses.createExpense.useMutation()
await mutation.mutateAsync({ amount: 100 })
```
