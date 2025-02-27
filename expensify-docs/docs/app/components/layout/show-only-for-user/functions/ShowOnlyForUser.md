# Function: ShowOnlyForUser()

> **ShowOnlyForUser**(`__namedParameters`): `null` \| `Element`

A component that conditionally renders content based on user authentication and authorization

## Parameters

### \_\_namedParameters

`Props`

## Returns

`null` \| `Element`

## Description

This component provides a declarative way to control content visibility based on user authentication
and specific user authorization. It uses pattern matching for clear and type-safe authorization logic.

Features:
- Conditional rendering based on authentication state
- User-specific authorization checks
- Type-safe pattern matching using ts-pattern
- Memoized result for performance optimization
- Client-side only execution ('use client')

## Example

```tsx
// Show content only for authenticated user
<ShowOnlyForUser>
  <RestrictedContent />
</ShowOnlyForUser>

// Show content only for specific user
<ShowOnlyForUser userIdToCheckAuth="user-123">
  <UserSpecificContent />
</ShowOnlyForUser>
```
