# Class: SignUpResponseDto

Data Transfer Object for successful user registration response.

## Description

This DTO represents the response sent back to the client after
successful user registration. It includes the user's ID which
can be used for subsequent operations.

## Example

```ts
{
 *   id: "550e8400-e29b-41d4-a716-446655440000"
 * }
```

## Constructors

### new SignUpResponseDto()

> **new SignUpResponseDto**(): [`SignUpResponseDto`](SignUpResponseDto.md)

#### Returns

[`SignUpResponseDto`](SignUpResponseDto.md)

## Properties

### id

> **id**: `string`

Unique identifier of the newly registered user.

#### Format

uuid

#### Required

#### Example

```ts
"550e8400-e29b-41d4-a716-446655440000"
```

***

### email

> **email**: `string`
