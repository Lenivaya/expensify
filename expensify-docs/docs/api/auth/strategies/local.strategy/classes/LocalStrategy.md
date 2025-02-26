# Class: LocalStrategy

Local authentication strategy for Passport.

## Description

This strategy implements username/password (local) authentication.
It is used primarily for the initial user login process.

Configuration:
- Uses 'login' field instead of default 'username' field
- Integrates with AuthService for user validation

## Example

```ts
// Route using local authentication
@UseGuards(LocalAuthGuard)
@Post('login')
async login(@Request() req) {
  return this.authService.login(req.user);
}
```

## Extends

- `Strategy`\<`this`\> & `PassportStrategyMixin`\<`unknown`, `this`\>

## Constructors

### new LocalStrategy()

> **new LocalStrategy**(`authService`): [`LocalStrategy`](LocalStrategy.md)

Configures the local strategy with custom field names.

#### Parameters

##### authService

[`AuthService`](../../../providers/auth.service/classes/AuthService.md)

Service handling user authentication

#### Returns

[`LocalStrategy`](LocalStrategy.md)

#### Overrides

`PassportStrategy(Strategy).constructor`

## Methods

### validate()

> **validate**(`login`, `password`): `Promise`\<\{ `id`: `string`; `username`: `string`; `firstName`: `null` \| `string`; `lastName`: `null` \| `string`; `email`: `string`; `password`: `string`; `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; \}\>

Validates user credentials against the database.

#### Parameters

##### login

`string`

The user's login (email or username)

##### password

`string`

The user's password

#### Returns

`Promise`\<\{ `id`: `string`; `username`: `string`; `firstName`: `null` \| `string`; `lastName`: `null` \| `string`; `email`: `string`; `password`: `string`; `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; \}\>

Promise resolving to the authenticated user

#### Throws

BadRequestException if credentials are invalid

#### Overrides

`PassportStrategy(Strategy).validate`
