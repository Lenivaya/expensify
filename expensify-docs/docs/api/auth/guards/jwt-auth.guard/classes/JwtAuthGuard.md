# Class: JwtAuthGuard

Guard that protects routes with JWT authentication.

## Description

This guard extends Passport's JWT authentication guard and adds support for public routes.
Routes can be marked as public using the @Public() decorator to bypass authentication.

Features:
- Automatically validates JWT tokens on protected routes
- Supports public route exceptions via @Public() decorator
- Integrates with NestJS's dependency injection system

## Example

```ts
// Make a route public
@Public()
@Get('public-endpoint')
publicEndpoint() {
  return 'This endpoint is public';
}

// Protected route (default behavior)
@Get('protected-endpoint')
protectedEndpoint() {
  return 'This endpoint requires authentication';
}
```

## Extends

- `IAuthGuard`

## Constructors

### new JwtAuthGuard()

> **new JwtAuthGuard**(`reflector`): [`JwtAuthGuard`](JwtAuthGuard.md)

Creates an instance of JwtAuthGuard.

#### Parameters

##### reflector

`Reflector`

NestJS reflector for accessing metadata

#### Returns

[`JwtAuthGuard`](JwtAuthGuard.md)

#### Overrides

`AuthGuard('jwt').constructor`

## Methods

### canActivate()

> **canActivate**(`context`): `boolean` \| `Promise`\<`boolean`\> \| `Observable`\<`boolean`\>

Determines if the current request can activate the route.

#### Parameters

##### context

`ExecutionContext`

Execution context containing request details

#### Returns

`boolean` \| `Promise`\<`boolean`\> \| `Observable`\<`boolean`\>

True if the route is public or if JWT authentication succeeds

#### Overrides

`AuthGuard('jwt').canActivate`
