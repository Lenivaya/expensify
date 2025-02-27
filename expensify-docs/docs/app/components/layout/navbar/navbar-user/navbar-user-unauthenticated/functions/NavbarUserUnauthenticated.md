# Function: NavbarUserUnauthenticated()

> **NavbarUserUnauthenticated**(): `Element`

Component for rendering unauthenticated user controls in the navbar

## Returns

`Element`

## Description

This component displays sign-in and sign-up options for unauthenticated users
in the navigation bar. It features animated buttons with hover effects and
clear visual hierarchy.

Features:
- Animated button interactions
- Gradient background on hover
- Icon animations
- Text rotation effects
- Responsive layout
- Client-side navigation with Next.js Link
- Hydration warning suppression

Visual Elements:
- Sign in button with login icon
- Sign up button with user plus icon
- Separator text ("or")
- Hover animations for both buttons
- Gradient background container

## Example

```tsx
// Usage in NavbarUser component
export function NavbarUser() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? (
    <NavbarUserAuthenticated />
  ) : (
    <NavbarUserUnauthenticated />
  )
}
```
