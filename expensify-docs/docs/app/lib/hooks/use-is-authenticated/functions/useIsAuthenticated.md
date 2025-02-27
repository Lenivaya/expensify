# Function: useIsAuthenticated()

> **useIsAuthenticated**(): `boolean`

Hook to check if the user is currently authenticated

## Returns

`boolean`

True if the user is authenticated, false otherwise

## Description

A React hook that provides a simple way to check if the user is currently
authenticated. It uses the presence of an auth token as the authentication
indicator.

Features:
- Simple boolean return value
- Reactive authentication state
- Automatic updates on auth changes
- Client-side only execution

## Example

```tsx
function ProtectedComponent() {
  const isAuthenticated = useIsAuthenticated()

  if (!isAuthenticated) {
    return <div>Please log in to view this content</div>
  }

  return <div>Protected content</div>
}
```
