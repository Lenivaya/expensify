# Class: UserDto

Data Transfer Object for user information.

This DTO is based on the Zod schema defined in userSelectSchema and represents
the user data that is returned from API endpoints. It contains the validated and
sanitized user information that is safe to send to clients.

The schema is defined in the database schema file and this class provides
the NestJS integration through nestjs-zod.

## Extends

- `object`

## Constructors

### new UserDto()

> **new UserDto**(): [`UserDto`](UserDto.md)

#### Returns

[`UserDto`](UserDto.md)

#### Inherited from

`createZodDto(userSelectSchema).constructor`

## Properties

### updatedAt

> **updatedAt**: `null` \| `Date`

#### Inherited from

`createZodDto(userSelectSchema).updatedAt`

***

### createdAt

> **createdAt**: `Date`

#### Inherited from

`createZodDto(userSelectSchema).createdAt`

***

### deletedAt

> **deletedAt**: `null` \| `Date`

#### Inherited from

`createZodDto(userSelectSchema).deletedAt`

***

### id

> **id**: `string`

#### Inherited from

`createZodDto(userSelectSchema).id`

***

### username

> **username**: `string`

#### Inherited from

`createZodDto(userSelectSchema).username`

***

### firstName

> **firstName**: `null` \| `string`

#### Inherited from

`createZodDto(userSelectSchema).firstName`

***

### lastName

> **lastName**: `null` \| `string`

#### Inherited from

`createZodDto(userSelectSchema).lastName`

***

### email

> **email**: `string`

#### Inherited from

`createZodDto(userSelectSchema).email`
