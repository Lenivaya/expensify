# Function: useIsAuthTokenPresent()

> **useIsAuthTokenPresent**(): `boolean`

Hook to check if an authentication token is present in local storage

## Returns

`boolean`

True if a valid auth token is present, false otherwise

## Description

A React hook that monitors the presence of an authentication token in local storage.
It provides real-time updates when the token status changes.

Features:
- Reactive token presence detection
- Automatic updates on token changes
- Safe local storage access
- Client-side only execution

## Example

```tsx
function AuthStatus() {
  const isTokenPresent = useIsAuthTokenPresent()

  return (
    <div>
      User is {isTokenPresent ? 'authenticated' : 'not authenticated'}
    </div>
  )
}
```
