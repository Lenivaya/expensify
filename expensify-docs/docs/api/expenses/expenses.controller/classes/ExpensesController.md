# Class: ExpensesController

## Constructors

### new ExpensesController()

> **new ExpensesController**(`expensesService`): [`ExpensesController`](ExpensesController.md)

#### Parameters

##### expensesService

[`ExpensesService`](../../expenses.service/classes/ExpensesService.md)

#### Returns

[`ExpensesController`](ExpensesController.md)

## Methods

### create()

> **create**(`request`, `createExpenseDto`): `Promise`\<\{ `id`: `string`; `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `amount`: `string`; `description`: `null` \| `string`; `tags`: `string`[]; `userId`: `string`; \}\>

#### Parameters

##### request

[`RequestWithUser`](../../../auth/interfaces/request-with-user/interfaces/RequestWithUser.md)

##### createExpenseDto

[`CreateExpenseDto`](../../dto/create-expense.dto/classes/CreateExpenseDto.md)

#### Returns

`Promise`\<\{ `id`: `string`; `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `amount`: `string`; `description`: `null` \| `string`; `tags`: `string`[]; `userId`: `string`; \}\>

***

### findAll()

> **findAll**(`request`, `page`?, `limit`?, `search`?, `tags`?): `Promise`\<[`ExpenseSearchDto`](../../dto/expenses-search.dto/classes/ExpenseSearchDto.md)\>

#### Parameters

##### request

[`RequestWithUser`](../../../auth/interfaces/request-with-user/interfaces/RequestWithUser.md)

##### page?

`number`

##### limit?

`number`

##### search?

`string`

##### tags?

`string`[]

#### Returns

`Promise`\<[`ExpenseSearchDto`](../../dto/expenses-search.dto/classes/ExpenseSearchDto.md)\>

***

### findOne()

> **findOne**(`request`, `id`): `Promise`\<\{ `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `id`: `string`; `amount`: `string`; `description`: `null` \| `string`; `tags`: `string`[]; `userId`: `string`; \}\>

#### Parameters

##### request

[`RequestWithUser`](../../../auth/interfaces/request-with-user/interfaces/RequestWithUser.md)

##### id

`string`

#### Returns

`Promise`\<\{ `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `id`: `string`; `amount`: `string`; `description`: `null` \| `string`; `tags`: `string`[]; `userId`: `string`; \}\>

***

### update()

> **update**(`request`, `id`, `updateExpenseDto`): `Promise`\<\{ `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `id`: `string`; `amount`: `string`; `description`: `null` \| `string`; `tags`: `string`[]; `userId`: `string`; \}\>

#### Parameters

##### request

[`RequestWithUser`](../../../auth/interfaces/request-with-user/interfaces/RequestWithUser.md)

##### id

`string`

##### updateExpenseDto

[`UpdateExpenseDto`](../../dto/update-expense.dto/classes/UpdateExpenseDto.md)

#### Returns

`Promise`\<\{ `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `id`: `string`; `amount`: `string`; `description`: `null` \| `string`; `tags`: `string`[]; `userId`: `string`; \}\>

***

### remove()

> **remove**(`request`, `id`): `Promise`\<\{ `id`: `string`; `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `amount`: `string`; `description`: `null` \| `string`; `tags`: `string`[]; `userId`: `string`; \}\>

#### Parameters

##### request

[`RequestWithUser`](../../../auth/interfaces/request-with-user/interfaces/RequestWithUser.md)

##### id

`string`

#### Returns

`Promise`\<\{ `id`: `string`; `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `amount`: `string`; `description`: `null` \| `string`; `tags`: `string`[]; `userId`: `string`; \}\>

***

### getTotalSpent()

> **getTotalSpent**(`request`): `Promise`\<`number`\>

#### Parameters

##### request

[`RequestWithUser`](../../../auth/interfaces/request-with-user/interfaces/RequestWithUser.md)

#### Returns

`Promise`\<`number`\>

***

### getTagStats()

> **getTagStats**(`request`): `Promise`\<[`TagStatistics`](../../../common/dto/tag-stats.dto/classes/TagStatistics.md)[]\>

#### Parameters

##### request

[`RequestWithUser`](../../../auth/interfaces/request-with-user/interfaces/RequestWithUser.md)

#### Returns

`Promise`\<[`TagStatistics`](../../../common/dto/tag-stats.dto/classes/TagStatistics.md)[]\>

***

### getMonthlyStats()

> **getMonthlyStats**(`request`, `year`): `Promise`\<[`MonthlyStats`](../../../common/dto/month-stats.dto/classes/MonthlyStats.md)[]\>

#### Parameters

##### request

[`RequestWithUser`](../../../auth/interfaces/request-with-user/interfaces/RequestWithUser.md)

##### year

`number`

#### Returns

`Promise`\<[`MonthlyStats`](../../../common/dto/month-stats.dto/classes/MonthlyStats.md)[]\>
