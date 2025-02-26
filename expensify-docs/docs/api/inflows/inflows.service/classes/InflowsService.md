# Class: InflowsService

Service responsible for managing inflow (income) operations.
Handles CRUD operations, statistics, and data aggregation for inflows.

## Constructors

### new InflowsService()

> **new InflowsService**(`drizzleService`, `usersService`): [`InflowsService`](InflowsService.md)

#### Parameters

##### drizzleService

[`DrizzleService`](../../../database/drizzle.service/classes/DrizzleService.md)

##### usersService

[`UsersService`](../../../users/users.service/classes/UsersService.md)

#### Returns

[`InflowsService`](InflowsService.md)

## Methods

### create()

> **create**(`userId`, `createInflowDto`): `Promise`\<[`InflowDto`](../../dto/inflow.dto/classes/InflowDto.md)\>

Creates a new inflow record for a user

#### Parameters

##### userId

`string`

The ID of the user creating the inflow

##### createInflowDto

[`CreateInflowDto`](../../dto/create-inflow.dto/classes/CreateInflowDto.md)

The inflow data to create

#### Returns

`Promise`\<[`InflowDto`](../../dto/inflow.dto/classes/InflowDto.md)\>

The created inflow record

***

### findAll()

> **findAll**(`userId`, `params`?): `Promise`\<[`InflowSearchDto`](../../dto/inflow-search.dto/classes/InflowSearchDto.md)\>

Retrieves all inflows for a user with optional filtering and pagination

#### Parameters

##### userId

`string`

The ID of the user

##### params?

Optional search parameters

###### search?

`string`

Search term for filtering by description or tags

###### tags?

`string`[]

Array of tags to filter by

###### page?

`number`

Page number for pagination

###### limit?

`number`

Number of items per page

#### Returns

`Promise`\<[`InflowSearchDto`](../../dto/inflow-search.dto/classes/InflowSearchDto.md)\>

Paginated list of inflows matching the criteria

***

### findById()

> **findById**(`userId`, `id`): `Promise`\<\{ `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `id`: `string`; `amount`: `string`; `description`: `null` \| `string`; `tags`: `string`[]; `userId`: `string`; \}\>

Finds a specific inflow by ID for a user

#### Parameters

##### userId

`string`

The ID of the user

##### id

`string`

The ID of the inflow to find

#### Returns

`Promise`\<\{ `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `id`: `string`; `amount`: `string`; `description`: `null` \| `string`; `tags`: `string`[]; `userId`: `string`; \}\>

The found inflow record

#### Throws

NotFoundException if the inflow doesn't exist

***

### update()

> **update**(`userId`, `id`, `updateInflowDto`): `Promise`\<\{ `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `id`: `string`; `amount`: `string`; `description`: `null` \| `string`; `tags`: `string`[]; `userId`: `string`; \}\>

Updates an existing inflow record

#### Parameters

##### userId

`string`

The ID of the user

##### id

`string`

The ID of the inflow to update

##### updateInflowDto

[`UpdateInflowDto`](../../dto/update-inflow.dto/classes/UpdateInflowDto.md)

The data to update

#### Returns

`Promise`\<\{ `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `id`: `string`; `amount`: `string`; `description`: `null` \| `string`; `tags`: `string`[]; `userId`: `string`; \}\>

The updated inflow record

#### Throws

NotFoundException if the inflow doesn't exist

***

### remove()

> **remove**(`userId`, `id`): `Promise`\<\{ `id`: `string`; `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `amount`: `string`; `description`: `null` \| `string`; `tags`: `string`[]; `userId`: `string`; \}\>

Removes an inflow record

#### Parameters

##### userId

`string`

The ID of the user

##### id

`string`

The ID of the inflow to remove

#### Returns

`Promise`\<\{ `id`: `string`; `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `amount`: `string`; `description`: `null` \| `string`; `tags`: `string`[]; `userId`: `string`; \}\>

The removed inflow record

#### Throws

NotFoundException if the inflow doesn't exist

***

### getTotalInflow()

> **getTotalInflow**(`userId`): `Promise`\<`number`\>

Calculates the total amount of all inflows for a user

#### Parameters

##### userId

`string`

The ID of the user

#### Returns

`Promise`\<`number`\>

The total amount of all inflows

***

### getTagStats()

> **getTagStats**(`userId`): `Promise`\<[`TagStatistics`](../../../common/dto/tag-stats.dto/classes/TagStatistics.md)[]\>

Retrieves statistics about inflow tags

#### Parameters

##### userId

`string`

The ID of the user

#### Returns

`Promise`\<[`TagStatistics`](../../../common/dto/tag-stats.dto/classes/TagStatistics.md)[]\>

Array of tag statistics including usage count and total amount

***

### getMonthlyStats()

> **getMonthlyStats**(`userId`, `year`): `Promise`\<[`MonthlyStats`](../../../common/dto/month-stats.dto/classes/MonthlyStats.md)[]\>

Retrieves monthly statistics for inflows in a specific year

#### Parameters

##### userId

`string`

The ID of the user

##### year

`number`

The year to get statistics for

#### Returns

`Promise`\<[`MonthlyStats`](../../../common/dto/month-stats.dto/classes/MonthlyStats.md)[]\>

Array of monthly statistics
