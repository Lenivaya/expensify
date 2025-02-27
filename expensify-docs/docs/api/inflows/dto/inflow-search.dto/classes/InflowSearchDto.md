# Class: InflowSearchDto

Data Transfer Object for inflow search results.

## Description

This DTO represents the paginated search results for inflow records.
It includes both the actual inflow data and metadata about the search results
such as pagination information and total count.

## Example

```ts
{
 *   data: [
 *     {
 *       id: '1',
 *       amount: 2500.0,
 *       description: 'Monthly salary',
 *       tags: ['salary'],
 *       createdAt: '2024-02-26T10:00:00Z',
 *       updatedAt: '2024-02-26T10:00:00Z'
 *     }
 *   ],
 *   meta: {
 *     total: 1,
 *     page: 1,
 *     limit: 10
 *   }
 * }
```

## Constructors

### new InflowSearchDto()

> **new InflowSearchDto**(): [`InflowSearchDto`](InflowSearchDto.md)

#### Returns

[`InflowSearchDto`](InflowSearchDto.md)

## Properties

### data

> **data**: [`InflowDto`](../../inflow.dto/classes/InflowDto.md)[]

***

### meta

> **meta**: [`MetaSearchInfo`](../../../../common/dto/meta-search-info.dto/classes/MetaSearchInfo.md)
