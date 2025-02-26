# Class: UserUpdateDto

Data Transfer Object for updating user information.

This DTO is based on the Zod schema defined in userUpdateSchema and represents
the data structure used when updating user information through API endpoints.
It contains the validated fields that can be modified during a user update operation.

The schema is defined in the database schema file and this class provides
the NestJS integration through nestjs-zod.

## Extends

- `object`

## Constructors

### new UserUpdateDto()

> **new UserUpdateDto**(): [`UserUpdateDto`](UserUpdateDto.md)

#### Returns

[`UserUpdateDto`](UserUpdateDto.md)

#### Inherited from

`createZodDto(userUpdateSchema).constructor`

## Properties

### id?

> `optional` **id**: `string`

#### Inherited from

`createZodDto(userUpdateSchema).id`

***

### firstName?

> `optional` **firstName**: `null` \| `string`

#### Inherited from

`createZodDto(userUpdateSchema).firstName`

***

### lastName?

> `optional` **lastName**: `null` \| `string`

#### Inherited from

`createZodDto(userUpdateSchema).lastName`

***

### email?

> `optional` **email**: `string`

#### Inherited from

`createZodDto(userUpdateSchema).email`
