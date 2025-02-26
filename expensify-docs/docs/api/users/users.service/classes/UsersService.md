# Class: UsersService

Service responsible for handling user-related business logic in the Expensify application.

This service provides methods for managing user profiles and retrieving financial data
associated with users, including balance information, financial summaries, and transaction statistics.
It implements caching strategies to optimize performance for frequently accessed data.

## Constructors

### new UsersService()

> **new UsersService**(`drizzleService`, `cacheManager`): [`UsersService`](UsersService.md)

Creates an instance of the UsersService.

#### Parameters

##### drizzleService

[`DrizzleService`](../../../database/drizzle.service/classes/DrizzleService.md)

Service for database operations using Drizzle ORM

##### cacheManager

`Cache`

Cache manager for storing and retrieving cached data

#### Returns

[`UsersService`](UsersService.md)

## Methods

### invalidateUserStatsCache()

> **invalidateUserStatsCache**(`userId`): `Promise`\<`void`\>

Invalidates all cached data for a specific user.
This should be called whenever user data is modified to ensure fresh data is fetched.

#### Parameters

##### userId

`string`

The ID of the user whose cache should be invalidated

#### Returns

`Promise`\<`void`\>

***

### findById()

> **findById**(`id`): `Promise`\<\{ `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `id`: `string`; `username`: `string`; `firstName`: `null` \| `string`; `lastName`: `null` \| `string`; `email`: `string`; `password`: `string`; \}\>

Finds a user by their ID.

#### Parameters

##### id

`string`

The ID of the user to find

#### Returns

`Promise`\<\{ `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `id`: `string`; `username`: `string`; `firstName`: `null` \| `string`; `lastName`: `null` \| `string`; `email`: `string`; `password`: `string`; \}\>

The user object if found, or undefined if not found

***

### findByLogin()

> **findByLogin**(`login`): `Promise`\<\{ `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `id`: `string`; `username`: `string`; `firstName`: `null` \| `string`; `lastName`: `null` \| `string`; `email`: `string`; `password`: `string`; \}\>

Finds a user by their login (either email or username).

#### Parameters

##### login

`string`

The email or username to search for

#### Returns

`Promise`\<\{ `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `id`: `string`; `username`: `string`; `firstName`: `null` \| `string`; `lastName`: `null` \| `string`; `email`: `string`; `password`: `string`; \}\>

The user object if found, or undefined if not found

***

### findByEmail()

> **findByEmail**(`email`): `Promise`\<\{ `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `id`: `string`; `username`: `string`; `firstName`: `null` \| `string`; `lastName`: `null` \| `string`; `email`: `string`; `password`: `string`; \}\>

Finds a user by their email address.

#### Parameters

##### email

`string`

The email address to search for

#### Returns

`Promise`\<\{ `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `id`: `string`; `username`: `string`; `firstName`: `null` \| `string`; `lastName`: `null` \| `string`; `email`: `string`; `password`: `string`; \}\>

The user object if found, or undefined if not found

***

### updateUser()

> **updateUser**(`id`, `updatedUser`): `Promise`\<\{ `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `id`: `string`; `username`: `string`; `firstName`: `null` \| `string`; `lastName`: `null` \| `string`; `email`: `string`; `password`: `string`; \}\>

Updates a user's profile information.

#### Parameters

##### id

`string`

The ID of the user to update

##### updatedUser

[`UserUpdateDto`](../../dto/user-update.dto/classes/UserUpdateDto.md)

The new user data to apply

#### Returns

`Promise`\<\{ `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `id`: `string`; `username`: `string`; `firstName`: `null` \| `string`; `lastName`: `null` \| `string`; `email`: `string`; `password`: `string`; \}\>

The updated user object

#### Throws

NotFoundException if the user is not found

***

### deleteUser()

> **deleteUser**(`id`): `Promise`\<`void`\>

Deletes a user account.

#### Parameters

##### id

`string`

The ID of the user to delete

#### Returns

`Promise`\<`void`\>

#### Throws

NotFoundException if the user is not found

***

### getCurrentBalance()

> **getCurrentBalance**(`userId`): `Promise`\<[`BalanceDto`](../../dto/balance.dto/classes/BalanceDto.md)\>

Retrieves the current balance for a user.

#### Parameters

##### userId

`string`

The ID of the user to get the balance for

#### Returns

`Promise`\<[`BalanceDto`](../../dto/balance.dto/classes/BalanceDto.md)\>

A BalanceDto containing total inflows, expenses, and net balance

***

### getMonthlyBalance()

> **getMonthlyBalance**(`userId`, `year`): `Promise`\<\{\}\>

Retrieves the monthly balance breakdown for a specific year.

#### Parameters

##### userId

`string`

The ID of the user to get the monthly balance for

##### year

`number`

The year for which to retrieve monthly balance data

#### Returns

`Promise`\<\{\}\>

An array of monthly balance records for the specified year

***

### getFinancialSummary()

> **getFinancialSummary**(`userId`): `Promise`\<[`FinancialSummaryDto`](../../dto/financial-summary.dto/classes/FinancialSummaryDto.md)\>

Retrieves a comprehensive financial summary for a user.

#### Parameters

##### userId

`string`

The ID of the user to get the financial summary for

#### Returns

`Promise`\<[`FinancialSummaryDto`](../../dto/financial-summary.dto/classes/FinancialSummaryDto.md)\>

A FinancialSummaryDto containing current balance and statistical analysis

***

### getTopTags()

> **getTopTags**(`userId`): `Promise`\<\{\}\>

Retrieves a summary of the top tags used by a user.

#### Parameters

##### userId

`string`

The ID of the user to get the tag summary for

#### Returns

`Promise`\<\{\}\>

An object containing arrays of top inflow and expense tags with amounts

***

### getBalanceHistory()

> **getBalanceHistory**(`userId`): `Promise`\<[`BalanceHistoryItemDto`](../../dto/balance-history.dto/classes/BalanceHistoryItemDto.md)[]\>

Retrieves the complete balance history for a user.

#### Parameters

##### userId

`string`

The ID of the user to get the balance history for

#### Returns

`Promise`\<[`BalanceHistoryItemDto`](../../dto/balance-history.dto/classes/BalanceHistoryItemDto.md)[]\>

An array of balance history records with cumulative totals
