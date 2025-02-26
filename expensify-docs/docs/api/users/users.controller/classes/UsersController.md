# Class: UsersController

Controller responsible for handling user-related HTTP requests in the Expensify application.

This controller provides endpoints for managing user profiles and retrieving financial data
associated with users, including balance information, financial summaries, and transaction statistics.
All endpoints require authentication through JWT tokens and enforce authorization rules to ensure
users can only access their own data.

The controller uses Swagger decorators to document the API endpoints for easy integration
with API documentation tools.

## Constructors

### new UsersController()

> **new UsersController**(`usersService`): [`UsersController`](UsersController.md)

#### Parameters

##### usersService

[`UsersService`](../../users.service/classes/UsersService.md)

#### Returns

[`UsersController`](UsersController.md)

## Methods

### updateUser()

> **updateUser**(`request`, `updateDto`, `id`): `Promise`\<\{ `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `id`: `string`; `username`: `string`; `firstName`: `null` \| `string`; `lastName`: `null` \| `string`; `email`: `string`; `password`: `string`; \}\>

Updates a user's profile information.

#### Parameters

##### request

[`RequestWithUser`](../../../auth/interfaces/request-with-user/interfaces/RequestWithUser.md)

The HTTP request with authenticated user information

##### updateDto

[`UserUpdateDto`](../../dto/user-update.dto/classes/UserUpdateDto.md)

The data to update in the user profile

##### id

`string`

The ID of the user to update

#### Returns

`Promise`\<\{ `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `id`: `string`; `username`: `string`; `firstName`: `null` \| `string`; `lastName`: `null` \| `string`; `email`: `string`; `password`: `string`; \}\>

The updated user information

#### Throws

UnauthorizedException if the authenticated user is not the user being updated

#### Throws

NotFoundException if the user is not found

***

### deleteUser()

> **deleteUser**(`request`, `id`): `Promise`\<`void`\>

Deletes a user account.

#### Parameters

##### request

[`RequestWithUser`](../../../auth/interfaces/request-with-user/interfaces/RequestWithUser.md)

The HTTP request with authenticated user information

##### id

`string`

The ID of the user to delete

#### Returns

`Promise`\<`void`\>

#### Throws

UnauthorizedException if the authenticated user is not the user being deleted

#### Throws

NotFoundException if the user is not found

***

### getCurrentBalance()

> **getCurrentBalance**(`request`, `id`): `Promise`\<[`BalanceDto`](../../dto/balance.dto/classes/BalanceDto.md)\>

Retrieves the current balance for a user.

#### Parameters

##### request

[`RequestWithUser`](../../../auth/interfaces/request-with-user/interfaces/RequestWithUser.md)

The HTTP request with authenticated user information

##### id

`string`

The ID of the user to get the balance for

#### Returns

`Promise`\<[`BalanceDto`](../../dto/balance.dto/classes/BalanceDto.md)\>

The current balance information including total inflows, expenses, and net balance

#### Throws

UnauthorizedException if the authenticated user is not the user whose balance is being requested

#### Throws

NotFoundException if the user is not found

***

### getMonthlyBalance()

> **getMonthlyBalance**(`request`, `year`): `Promise`\<\{\}\>

Retrieves the monthly balance breakdown for a specific year.

#### Parameters

##### request

[`RequestWithUser`](../../../auth/interfaces/request-with-user/interfaces/RequestWithUser.md)

The HTTP request with authenticated user information

##### year

`number`

The year for which to retrieve monthly balance data

#### Returns

`Promise`\<\{\}\>

An array of monthly balance records for the specified year

#### Throws

UnauthorizedException if not properly authenticated

***

### getFinancialSummary()

> **getFinancialSummary**(`request`): `Promise`\<[`FinancialSummaryDto`](../../dto/financial-summary.dto/classes/FinancialSummaryDto.md)\>

Retrieves a comprehensive financial summary for the authenticated user.

#### Parameters

##### request

[`RequestWithUser`](../../../auth/interfaces/request-with-user/interfaces/RequestWithUser.md)

The HTTP request with authenticated user information

#### Returns

`Promise`\<[`FinancialSummaryDto`](../../dto/financial-summary.dto/classes/FinancialSummaryDto.md)\>

A financial summary including current balance and statistical analysis

#### Throws

UnauthorizedException if not properly authenticated

***

### getTopTags()

> **getTopTags**(`request`): `Promise`\<\{\}\>

Retrieves a summary of the top tags used by the authenticated user.

#### Parameters

##### request

[`RequestWithUser`](../../../auth/interfaces/request-with-user/interfaces/RequestWithUser.md)

The HTTP request with authenticated user information

#### Returns

`Promise`\<\{\}\>

A summary of top tags for both inflows and expenses

#### Throws

UnauthorizedException if not properly authenticated

***

### getBalanceHistory()

> **getBalanceHistory**(`request`): `Promise`\<[`BalanceHistoryItemDto`](../../dto/balance-history.dto/classes/BalanceHistoryItemDto.md)[]\>

Retrieves the complete balance history for the authenticated user.

#### Parameters

##### request

[`RequestWithUser`](../../../auth/interfaces/request-with-user/interfaces/RequestWithUser.md)

The HTTP request with authenticated user information

#### Returns

`Promise`\<[`BalanceHistoryItemDto`](../../dto/balance-history.dto/classes/BalanceHistoryItemDto.md)[]\>

An array of balance history records with cumulative totals

#### Throws

UnauthorizedException if not properly authenticated
