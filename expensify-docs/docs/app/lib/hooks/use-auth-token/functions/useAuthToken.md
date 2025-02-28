# Function: useAuthToken()

> **useAuthToken**(): \[[`Option`](../../../utils/type-aliases/Option.md)\<`string`\>, (`token`) => `void`, () => `void`\]

Hook for managing authentication token in local storage

## Returns

\[[`Option`](../../../utils/type-aliases/Option.md)\<`string`\>, (`token`) => `void`, () => `void`\]

A tuple containing:
- Current token value (null if not present)
- Function to set a new token
- Function to remove the token

## Description

A React hook that provides functionality to read, write, and remove
the authentication token from local storage. It uses a tuple return
pattern for easy destructuring.

Features:
- Persistent token storage
- Type-safe token management
- Automatic serialization/deserialization
- Null safety with Option type

## Example

```tsx
function LoginComponent() {
  const [token, setToken, removeToken] = useAuthToken()

  const handleLogin = async (credentials) => {
    const token = await loginUser(credentials)
    setToken(token)
  }

  const handleLogout = () => {
    removeToken()
  }

  return token ? (
    <button onClick={handleLogout}>Logout</button>
  ) : (
    <button onClick={handleLogin}>Login</button>
  )
}
```
