# Class: InflowsController

Controller handling all inflow-related HTTP endpoints.
Provides REST API endpoints for managing income transactions.
All endpoints require authentication via JWT.

## Constructors

### new InflowsController()

> **new InflowsController**(`inflowsService`): [`InflowsController`](InflowsController.md)

#### Parameters

##### inflowsService

[`InflowsService`](../../inflows.service/classes/InflowsService.md)

#### Returns

[`InflowsController`](InflowsController.md)

## Methods

### create()

> **create**(`request`, `createInflowDto`): `Promise`\<[`InflowDto`](../../dto/inflow.dto/classes/InflowDto.md)\>

Creates a new inflow record

#### Parameters

##### request

[`RequestWithUser`](../../../auth/interfaces/request-with-user/interfaces/RequestWithUser.md)

The HTTP request containing the authenticated user

##### createInflowDto

[`CreateInflowDto`](../../dto/create-inflow.dto/classes/CreateInflowDto.md)

The inflow data to create

#### Returns

`Promise`\<[`InflowDto`](../../dto/inflow.dto/classes/InflowDto.md)\>

The created inflow record

***

### findAll()

> **findAll**(`request`, `page`?, `limit`?, `search`?, `tags`?): `Promise`\<[`InflowSearchDto`](../../dto/inflow-search.dto/classes/InflowSearchDto.md)\>

Retrieves all inflows with optional filtering and pagination

#### Parameters

##### request

[`RequestWithUser`](../../../auth/interfaces/request-with-user/interfaces/RequestWithUser.md)

The HTTP request containing the authenticated user

##### page?

`number`

Page number for pagination

##### limit?

`number`

Number of items per page

##### search?

`string`

Search term for filtering

##### tags?

`string`[]

Array of tags to filter by

#### Returns

`Promise`\<[`InflowSearchDto`](../../dto/inflow-search.dto/classes/InflowSearchDto.md)\>

Paginated list of inflows

***

### findOne()

> **findOne**(`request`, `id`): `Promise`\<\{ `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `id`: `string`; `amount`: `string`; `description`: `null` \| `string`; `tags`: `string`[]; `userId`: `string`; \}\>

Retrieves a specific inflow by ID

#### Parameters

##### request

[`RequestWithUser`](../../../auth/interfaces/request-with-user/interfaces/RequestWithUser.md)

The HTTP request containing the authenticated user

##### id

`string`

The ID of the inflow to retrieve

#### Returns

`Promise`\<\{ `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `id`: `string`; `amount`: `string`; `description`: `null` \| `string`; `tags`: `string`[]; `userId`: `string`; \}\>

The requested inflow record

***

### update()

> **update**(`request`, `id`, `updateInflowDto`): `Promise`\<\{ `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `id`: `string`; `amount`: `string`; `description`: `null` \| `string`; `tags`: `string`[]; `userId`: `string`; \}\>

Updates an existing inflow record

#### Parameters

##### request

[`RequestWithUser`](../../../auth/interfaces/request-with-user/interfaces/RequestWithUser.md)

The HTTP request containing the authenticated user

##### id

`string`

The ID of the inflow to update

##### updateInflowDto

[`UpdateInflowDto`](../../dto/update-inflow.dto/classes/UpdateInflowDto.md)

The data to update

#### Returns

`Promise`\<\{ `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `id`: `string`; `amount`: `string`; `description`: `null` \| `string`; `tags`: `string`[]; `userId`: `string`; \}\>

The updated inflow record

***

### remove()

> **remove**(`request`, `id`): `Promise`\<\{ `id`: `string`; `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `amount`: `string`; `description`: `null` \| `string`; `tags`: `string`[]; `userId`: `string`; \}\>

Deletes an inflow record

#### Parameters

##### request

[`RequestWithUser`](../../../auth/interfaces/request-with-user/interfaces/RequestWithUser.md)

The HTTP request containing the authenticated user

##### id

`string`

The ID of the inflow to delete

#### Returns

`Promise`\<\{ `id`: `string`; `updatedAt`: `null` \| `Date`; `createdAt`: `Date`; `deletedAt`: `null` \| `Date`; `amount`: `string`; `description`: `null` \| `string`; `tags`: `string`[]; `userId`: `string`; \}\>

The deleted inflow record

***

### getTotalInflow()

> **getTotalInflow**(`request`): `Promise`\<`number`\>

Retrieves the total amount of all inflows

#### Parameters

##### request

[`RequestWithUser`](../../../auth/interfaces/request-with-user/interfaces/RequestWithUser.md)

The HTTP request containing the authenticated user

#### Returns

`Promise`\<`number`\>

The total amount of all inflows

***

### getTagStats()

> **getTagStats**(`request`): `Promise`\<[`TagStatistics`](../../../common/dto/tag-stats.dto/classes/TagStatistics.md)[]\>

Retrieves statistics about inflow tags

#### Parameters

##### request

[`RequestWithUser`](../../../auth/interfaces/request-with-user/interfaces/RequestWithUser.md)

The HTTP request containing the authenticated user

#### Returns

`Promise`\<[`TagStatistics`](../../../common/dto/tag-stats.dto/classes/TagStatistics.md)[]\>

Array of tag statistics

***

### getMonthlyStats()

> **getMonthlyStats**(`request`, `year`): `Promise`\<[`MonthlyStats`](../../../common/dto/month-stats.dto/classes/MonthlyStats.md)[]\>

Retrieves monthly statistics for a specific year

#### Parameters

##### request

[`RequestWithUser`](../../../auth/interfaces/request-with-user/interfaces/RequestWithUser.md)

The HTTP request containing the authenticated user

##### year

`number`

The year to get statistics for

#### Returns

`Promise`\<[`MonthlyStats`](../../../common/dto/month-stats.dto/classes/MonthlyStats.md)[]\>

Array of monthly statistics
