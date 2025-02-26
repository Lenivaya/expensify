# Function: withAuth()

> **withAuth**\<`T`\>(`Component`): `FC`\<`T`\>

Wraps a component with authentication protection

## Type Parameters

• **T** *extends* `object`

The props type of the wrapped component

## Parameters

### Component

`ComponentType`\<`T`\>

The component to wrap with auth protection

## Returns

`FC`\<`T`\>

The wrapped component with auth protection

## Description

This function implements the authentication protection logic. It:
1. Checks the authentication state
2. Redirects to sign-in if not authenticated
3. Renders the protected component if authenticated

The wrapped component receives all its original props unchanged.
