# Class: SignUpDto

Data Transfer Object for user registration requests.

## Description

This DTO validates new user registration data. It includes required fields
like username, email, and password, as well as optional personal information
like first and last name.

All fields are validated according to specific rules:
- Username must be unique and string
- Email must be valid and unique
- Password must be at least 8 characters
- Names are optional but must be strings if provided

## Example

```ts
{
 *   username: "johndoe",
 *   firstName: "John",
 *   lastName: "Doe",
 *   email: "john.doe@example.com",
 *   password: "z1Tlxb1tuXH7"
 * }
```

## Constructors

### new SignUpDto()

> **new SignUpDto**(): [`SignUpDto`](SignUpDto.md)

#### Returns

[`SignUpDto`](SignUpDto.md)

## Properties

### username

> **username**: `string`

Unique username for the new user.
Used for identification and login.

#### Required

#### Min Length

3

#### Example

```ts
"johndoe"
```

***

### firstName

> **firstName**: `string`

User's first name.
Optional personal information.

#### Optional

#### Example

```ts
"John"
```

***

### lastName

> **lastName**: `string`

User's last name.
Optional personal information.

#### Optional

#### Example

```ts
"Doe"
```

***

### email

> **email**: `string`

User's email address.
Must be unique and valid email format.
Used for account verification and communication.

#### Required

#### Format

email

#### Example

```ts
"john.doe@example.com"
```

***

### password

> **password**: `string`

User's password for authentication.
Must be at least 8 characters long.

#### Required

#### Min Length

8

#### Example

```ts
"z1Tlxb1tuXH7"
```

#### Security

Password will be hashed before storage
