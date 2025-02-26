# Interface: RequestWithUser

Extended Fastify request type that includes authenticated user data.

## Description

This interface extends the base FastifyRequest to include the authenticated
user's information. It's used throughout the application to access the
current user's data in route handlers and middleware.

The user property is populated by the JWT authentication guard after
successful token validation.

## Example

```ts
async function handler(request: RequestWithUser) {
  const userId = request.user.id;
  // Use userId to fetch user-specific data
}
```

## Extends

- `FastifyRequest`

## Properties

### user

> **user**: [`UserPayload`](../type-aliases/UserPayload.md)

Authenticated user information extracted from JWT token
