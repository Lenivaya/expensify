# Class: `abstract` HashingService

Abstract service defining the contract for password hashing operations.

## Description

This abstract class defines the interface for password hashing operations.
Implementations of this service should provide secure methods for:
- Hashing passwords or sensitive data
- Comparing plain text data with hashed data

The actual hashing algorithm and implementation details are left to the concrete implementations
to allow for flexibility in choosing the most appropriate hashing strategy.

## Constructors

### new HashingService()

> **new HashingService**(): [`HashingService`](HashingService.md)

#### Returns

[`HashingService`](HashingService.md)

## Methods

### hash()

> `abstract` **hash**(`data`): `Promise`\<`string`\>

Hashes the provided data using a secure hashing algorithm.

#### Parameters

##### data

The plain text data or buffer to hash

`string` | `Buffer`\<`ArrayBufferLike`\>

#### Returns

`Promise`\<`string`\>

Promise resolving to the hashed string

***

### compare()

> `abstract` **compare**(`data`, `encrypted`): `Promise`\<`boolean`\>

Compares plain text data with a hashed value.

#### Parameters

##### data

The plain text data or buffer to compare

`string` | `Buffer`\<`ArrayBufferLike`\>

##### encrypted

`string`

The hashed data to compare against

#### Returns

`Promise`\<`boolean`\>

Promise resolving to true if the data matches the hash, false otherwise
