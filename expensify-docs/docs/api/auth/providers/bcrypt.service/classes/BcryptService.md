# Class: BcryptService

Implementation of HashingService using the bcrypt hashing algorithm.

## Description

This service provides a concrete implementation of the HashingService using bcrypt,
a password-hashing function designed by Niels Provos and David Mazières.

Features:
- Automatically generates and handles salts for each hash
- Uses bcrypt's adaptive hashing algorithm
- Implements industry-standard password hashing practices

## Implements

- [`HashingService`](../../hashing.service/classes/HashingService.md)

## Constructors

### new BcryptService()

> **new BcryptService**(): [`BcryptService`](BcryptService.md)

#### Returns

[`BcryptService`](BcryptService.md)

## Methods

### hash()

> **hash**(`data`): `Promise`\<`string`\>

Hashes data using bcrypt with an automatically generated salt.

#### Parameters

##### data

The plain text data or buffer to hash

`string` | `Buffer`

#### Returns

`Promise`\<`string`\>

Promise resolving to the bcrypt hashed string

#### Implementation of

[`HashingService`](../../hashing.service/classes/HashingService.md).[`hash`](../../hashing.service/classes/HashingService.md#hash)

***

### compare()

> **compare**(`data`, `encrypted`): `Promise`\<`boolean`\>

Compares plain text data with a bcrypt hash.

#### Parameters

##### data

The plain text data or buffer to compare

`string` | `Buffer`

##### encrypted

`string`

The bcrypt hashed string to compare against

#### Returns

`Promise`\<`boolean`\>

Promise resolving to true if the data matches the hash, false otherwise

#### Implementation of

[`HashingService`](../../hashing.service/classes/HashingService.md).[`compare`](../../hashing.service/classes/HashingService.md#compare)
