# Function: QueryProvider()

> **QueryProvider**(`__namedParameters`): `Element`

Application-wide provider for React Query functionality

## Parameters

### \_\_namedParameters

`QueryProviderProps`

## Returns

`Element`

## Description

This component provides React Query context to the entire application,
enabling data fetching, caching, and state management features.
It uses a shared QueryClient instance for consistent caching across the app.

Features:
- Global query state management
- Shared caching layer
- Automatic background refetching
- Request deduplication
- Optimistic updates
- Client-side only execution ('use client')

## Example

```tsx
// Usage in app root
export default function App() {
  return (
    <QueryProvider>
      <RestOfApp />
    </QueryProvider>
  )
}
```
