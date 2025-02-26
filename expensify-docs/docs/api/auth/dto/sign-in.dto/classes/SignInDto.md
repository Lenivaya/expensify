# Class: SignInDto

Data Transfer Object for user sign-in requests.

## Description

This DTO validates user credentials during the sign-in process.
It accepts either an email address or username as the login identifier,
along with the user's password.

## Example

```ts
// Using email
{
  login: "user@example.com",
  password: "z1Tlxb1tuXH7"
}

// Using username
{
  login: "johndoe",
  password: "z1Tlxb1tuXH7"
}
```

## Constructors

### new SignInDto()

> **new SignInDto**(): [`SignInDto`](SignInDto.md)

#### Returns

[`SignInDto`](SignInDto.md)

## Properties

### login

> **login**: `string`

User's login identifier (email or username).
Can be either the user's email address or their username.

#### Required

#### Example

```ts
"user@example.com" or "johndoe"
```

***

### password

> **password**: `string`

User's password for authentication.
Must match the hashed password stored in the database.

#### Required

#### Min Length

8

#### Example

```ts
"z1Tlxb1tuXH7"
```

#### Security

Password is transmitted securely but should never be logged
