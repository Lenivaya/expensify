# Class: AuthController

## Constructors

### new AuthController()

> **new AuthController**(`authService`, `userService`): [`AuthController`](AuthController.md)

#### Parameters

##### authService

[`AuthService`](../../../providers/auth.service/classes/AuthService.md)

##### userService

[`UsersService`](../../../../users/users.service/classes/UsersService.md)

#### Returns

[`AuthController`](AuthController.md)

## Methods

### signIn()

> **signIn**(`request`): `Promise`\<\{ `accessToken`: `string`; \}\>

#### Parameters

##### request

[`RequestWithUser`](../../../interfaces/request-with-user/interfaces/RequestWithUser.md)

#### Returns

`Promise`\<\{ `accessToken`: `string`; \}\>

***

### signUp()

> **signUp**(`signUpDto`): `Promise`\<\{ `id`: `string`; `username`: `string`; `firstName`: `null` \| `string`; `lastName`: `null` \| `string`; `email`: `string`; `password`: `string`; `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; \}\>

#### Parameters

##### signUpDto

[`SignUpDto`](../../../dto/sign-up.dto/classes/SignUpDto.md)

#### Returns

`Promise`\<\{ `id`: `string`; `username`: `string`; `firstName`: `null` \| `string`; `lastName`: `null` \| `string`; `email`: `string`; `password`: `string`; `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; \}\>

***

### getMe()

> **getMe**(`request`): `Promise`\<\{ `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `id`: `string`; `username`: `string`; `firstName`: `null` \| `string`; `lastName`: `null` \| `string`; `email`: `string`; `password`: `string`; \}\>

#### Parameters

##### request

[`RequestWithUser`](../../../interfaces/request-with-user/interfaces/RequestWithUser.md)

#### Returns

`Promise`\<\{ `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `id`: `string`; `username`: `string`; `firstName`: `null` \| `string`; `lastName`: `null` \| `string`; `email`: `string`; `password`: `string`; \}\>
