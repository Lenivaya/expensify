# Type Alias: UserPayload

> **UserPayload**: `object`

Represents the authenticated user's payload in JWT token.

## Type declaration

### id

> **id**: `string`

Unique identifier of the authenticated user (UUID v4)

## Description

This type defines the structure of the user information that is
extracted from the JWT token and attached to authenticated requests.
Contains only essential user identification data.

## Example

```ts
{
 *   id: "550e8400-e29b-41d4-a716-446655440000"
 * }
```
