# Function: NavbarUser()

> **NavbarUser**(): `Element`

A smart component that handles user authentication state in the navbar

## Returns

`Element`

## Description

This component acts as a container that conditionally renders either the authenticated
or unauthenticated user interface in the navbar based on the current authentication state.
It handles loading states and error conditions gracefully.

Features:
- Automatic authentication state detection
- Conditional rendering based on auth state
- Error handling with console logging
- Loading state management
- Client-side only execution ('use client')

States:
- Authenticated: Shows user profile and related actions
- Unauthenticated: Shows sign-in options
- Loading: Handled internally
- Error: Logs to console and falls back to unauthenticated view

## Example

```tsx
// Usage in Navbar component
export function Navbar() {
  return (
    <header>
      <nav>
        <NavbarUser />
      </nav>
    </header>
  )
}
```
