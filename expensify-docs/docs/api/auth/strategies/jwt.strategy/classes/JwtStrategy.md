# Class: JwtStrategy

JWT authentication strategy for Passport.

## Description

This strategy implements JWT token validation and extraction from requests.
It is used by the authentication guards to protect routes that require authentication.

Configuration:
- Extracts JWT from the Authorization header using the Bearer scheme
- Validates token expiration
- Uses JWT_SECRET from environment variables for token verification

## Example

```ts
// Protected route using JWT authentication
@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@Request() req) {
  return req.user;
}
```

## Extends

- `Strategy`\<`this`\> & `PassportStrategyMixin`\<`unknown`, `this`\>

## Constructors

### new JwtStrategy()

> **new JwtStrategy**(`configService`): [`JwtStrategy`](JwtStrategy.md)

Configures the JWT strategy with the necessary options.

#### Parameters

##### configService

`ConfigService`

NestJS config service for accessing environment variables

#### Returns

[`JwtStrategy`](JwtStrategy.md)

#### Overrides

`PassportStrategy(Strategy).constructor`

## Methods

### validate()

> **validate**(`payload`): `object`

Validates and transforms the JWT payload into a user object.

#### Parameters

##### payload

`any`

The decoded JWT payload

#### Returns

`object`

An object containing the user ID extracted from the payload

##### id

> **id**: `any` = `payload.sub`

#### Overrides

`PassportStrategy(Strategy).validate`
