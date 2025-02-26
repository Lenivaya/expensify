# Class: AuthService

Service responsible for handling authentication-related operations.

## Description

The AuthService provides functionality for:
- User validation during sign-in
- User registration (sign-up)
- JWT token generation and management

It integrates with:
- DrizzleService for database operations
- HashingService for password encryption
- JwtService for token management
- UsersService for user-related operations

## Constructors

### new AuthService()

> **new AuthService**(`drizzleService`, `hashingService`, `configService`, `jwtService`, `userService`): [`AuthService`](AuthService.md)

#### Parameters

##### drizzleService

[`DrizzleService`](../../../../database/drizzle.service/classes/DrizzleService.md)

##### hashingService

[`HashingService`](../../hashing.service/classes/HashingService.md)

##### configService

`ConfigService`

##### jwtService

`JwtService`

##### userService

[`UsersService`](../../../../users/users.service/classes/UsersService.md)

#### Returns

[`AuthService`](AuthService.md)

## Methods

### validateUser()

> **validateUser**(`login`, `password`): `Promise`\<\{ `id`: `string`; `username`: `string`; `firstName`: `null` \| `string`; `lastName`: `null` \| `string`; `email`: `string`; `password`: `string`; `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; \}\>

Validates user credentials during sign-in.

#### Parameters

##### login

`string`

The user's email or username

##### password

`string`

The user's password (plain text)

#### Returns

`Promise`\<\{ `id`: `string`; `username`: `string`; `firstName`: `null` \| `string`; `lastName`: `null` \| `string`; `email`: `string`; `password`: `string`; `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; \}\>

Promise resolving to the validated User object

#### Throws

BadRequestException if credentials are invalid

***

### signUp()

> **signUp**(`signUpDto`): `Promise`\<\{ `id`: `string`; `username`: `string`; `firstName`: `null` \| `string`; `lastName`: `null` \| `string`; `email`: `string`; `password`: `string`; `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; \}\>

Registers a new user in the system.

#### Parameters

##### signUpDto

[`SignUpDto`](../../../dto/sign-up.dto/classes/SignUpDto.md)

Data transfer object containing user registration details

#### Returns

`Promise`\<\{ `id`: `string`; `username`: `string`; `firstName`: `null` \| `string`; `lastName`: `null` \| `string`; `email`: `string`; `password`: `string`; `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; \}\>

Promise resolving to the newly created user

#### Throws

BadRequestException if email is already in use

***

### generateTokens()

> **generateTokens**(`userId`): `Promise`\<\{ `accessToken`: `string`; \}\>

Generates authentication tokens for a user.

#### Parameters

##### userId

`string`

The ID of the user to generate tokens for

#### Returns

`Promise`\<\{ `accessToken`: `string`; \}\>

Promise resolving to an object containing the access token

#### Throws

Error if user is not found
