# Function: useUser()

> **useUser**(): `object`

Hook to fetch and manage the current user's data

## Returns

`object`

An object containing:
- data: The user data if available
- isLoading: Boolean indicating if the data is being fetched
- error: Any error that occurred during fetching

### data

> **data**: `undefined` \| \{\}

### isLoading

> **isLoading**: `boolean`

### error

> **error**: `unknown`

## Description

A React hook that provides access to the currently authenticated user's data.
It automatically fetches user data when authenticated and provides loading
and error states.

Features:
- Automatic data fetching
- Loading state handling
- Error state handling
- Authentication-aware querying
- Type-safe user data

## Example

```tsx
function UserProfile() {
  const { data: user, isLoading, error } = useUser()

  if (isLoading) {
    return <div>Loading user data...</div>
  }

  if (error) {
    return <div>Error loading user data</div>
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
    </div>
  )
}
```
