# Class: ExpensesService

## Constructors

### new ExpensesService()

> **new ExpensesService**(`drizzleService`, `usersService`): [`ExpensesService`](ExpensesService.md)

#### Parameters

##### drizzleService

[`DrizzleService`](../../../database/drizzle.service/classes/DrizzleService.md)

##### usersService

[`UsersService`](../../../users/users.service/classes/UsersService.md)

#### Returns

[`ExpensesService`](ExpensesService.md)

## Methods

### create()

> **create**(`userId`, `createExpenseDto`): `Promise`\<\{ `userId`: `string`; `id`: `string`; `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `amount`: `string`; `description`: `null` \| `string`; `tags`: `string`[]; \}\>

#### Parameters

##### userId

`string`

##### createExpenseDto

[`CreateExpenseDto`](../../dto/create-expense.dto/classes/CreateExpenseDto.md)

#### Returns

`Promise`\<\{ `userId`: `string`; `id`: `string`; `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `amount`: `string`; `description`: `null` \| `string`; `tags`: `string`[]; \}\>

***

### findAll()

> **findAll**(`userId`, `params`?): `Promise`\<[`ExpenseSearchDto`](../../dto/expenses-search.dto/classes/ExpenseSearchDto.md)\>

#### Parameters

##### userId

`string`

##### params?

###### search?

`string`

###### tags?

`string`[]

###### page?

`number`

###### limit?

`number`

#### Returns

`Promise`\<[`ExpenseSearchDto`](../../dto/expenses-search.dto/classes/ExpenseSearchDto.md)\>

***

### findById()

> **findById**(`userId`, `id`): `Promise`\<\{ `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `id`: `string`; `amount`: `string`; `description`: `null` \| `string`; `tags`: `string`[]; `userId`: `string`; \}\>

#### Parameters

##### userId

`string`

##### id

`string`

#### Returns

`Promise`\<\{ `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `id`: `string`; `amount`: `string`; `description`: `null` \| `string`; `tags`: `string`[]; `userId`: `string`; \}\>

***

### update()

> **update**(`userId`, `id`, `updateExpenseDto`): `Promise`\<\{ `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `id`: `string`; `amount`: `string`; `description`: `null` \| `string`; `tags`: `string`[]; `userId`: `string`; \}\>

#### Parameters

##### userId

`string`

##### id

`string`

##### updateExpenseDto

[`UpdateExpenseDto`](../../dto/update-expense.dto/classes/UpdateExpenseDto.md)

#### Returns

`Promise`\<\{ `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `id`: `string`; `amount`: `string`; `description`: `null` \| `string`; `tags`: `string`[]; `userId`: `string`; \}\>

***

### remove()

> **remove**(`userId`, `id`): `Promise`\<\{ `userId`: `string`; `id`: `string`; `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `amount`: `string`; `description`: `null` \| `string`; `tags`: `string`[]; \}\>

#### Parameters

##### userId

`string`

##### id

`string`

#### Returns

`Promise`\<\{ `userId`: `string`; `id`: `string`; `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `amount`: `string`; `description`: `null` \| `string`; `tags`: `string`[]; \}\>

***

### getTotalSpent()

> **getTotalSpent**(`userId`): `Promise`\<`number`\>

#### Parameters

##### userId

`string`

#### Returns

`Promise`\<`number`\>

***

### getTagStats()

> **getTagStats**(`userId`): `Promise`\<[`TagStatistics`](../../../common/dto/tag-stats.dto/classes/TagStatistics.md)[]\>

#### Parameters

##### userId

`string`

#### Returns

`Promise`\<[`TagStatistics`](../../../common/dto/tag-stats.dto/classes/TagStatistics.md)[]\>

***

### getMonthlyStats()

> **getMonthlyStats**(`userId`, `year`): `Promise`\<[`MonthlyStats`](../../../common/dto/month-stats.dto/classes/MonthlyStats.md)[]\>

#### Parameters

##### userId

`string`

##### year

`number`

#### Returns

`Promise`\<[`MonthlyStats`](../../../common/dto/month-stats.dto/classes/MonthlyStats.md)[]\>
