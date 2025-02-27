# Class: ExpenseSearchDto

Data Transfer Object for expense search results.

## Description

This DTO represents the paginated search results for expense records.
It includes both the actual expense data and metadata about the search results
such as pagination information and total count.

## Example

```ts
{
 *   data: [
 *     {
 *       id: '1',
 *       amount: 29.99,
 *       description: 'Grocery shopping',
 *       tags: ['food', 'groceries'],
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

### new ExpenseSearchDto()

> **new ExpenseSearchDto**(): [`ExpenseSearchDto`](ExpenseSearchDto.md)

#### Returns

[`ExpenseSearchDto`](ExpenseSearchDto.md)

## Properties

### data

> **data**: [`ExpenseDto`](../../expense.dto/classes/ExpenseDto.md)[]

***

### meta

> **meta**: [`MetaSearchInfo`](../../../../common/dto/meta-search-info.dto/classes/MetaSearchInfo.md)
