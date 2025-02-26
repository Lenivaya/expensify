# Class: SignInResponseDto

Data Transfer Object for successful sign-in response.

## Description

This DTO represents the response sent back to the client after
successful authentication. It contains the JWT access token that
should be used for subsequent authenticated requests.

The token should be included in the Authorization header as:
`Authorization: Bearer {token}`

## Example

```ts
{
 *   accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * }
```

## Constructors

### new SignInResponseDto()

> **new SignInResponseDto**(): [`SignInResponseDto`](SignInResponseDto.md)

#### Returns

[`SignInResponseDto`](SignInResponseDto.md)

## Properties

### accessToken

> **accessToken**: `string`

JWT access token for authenticated requests.
Valid for the duration specified in JWT_TOKEN_TTL.

#### Required

#### Example

```ts
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

***

### refreshToken

> `readonly` **refreshToken**: `string`
