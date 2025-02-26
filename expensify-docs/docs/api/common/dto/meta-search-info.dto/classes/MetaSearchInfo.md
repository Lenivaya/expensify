# Class: MetaSearchInfo

Data Transfer Object for pagination and search result metadata.

## Description

This DTO provides information about paginated search results,
including the current page, items per page, total items, and
total number of pages. Used across the application for consistent
pagination handling.

## Example

```ts
{
 *   page: 1,
 *   limit: 10,
 *   total: 45,
 *   pageCount: 5
 * }
```

## Constructors

### new MetaSearchInfo()

> **new MetaSearchInfo**(): [`MetaSearchInfo`](MetaSearchInfo.md)

#### Returns

[`MetaSearchInfo`](MetaSearchInfo.md)

## Properties

### page

> **page**: `number`

Current page number in the paginated results.
Pages are 1-indexed (first page is 1, not 0).

#### Minimum

1

#### Required

#### Example

```ts
1
```

***

### limit

> **limit**: `number`

Maximum number of items per page.
Controls how many items are returned in each page of results.

#### Minimum

1

#### Required

#### Example

```ts
10
```

***

### total

> **total**: `number`

Total number of items matching the search criteria.
This is the total count before pagination is applied.

#### Minimum

0

#### Required

#### Example

```ts
45
```

***

### pageCount

> **pageCount**: `number`

Total number of pages available based on the total items and limit.
Calculated as Math.ceil(total / limit).

#### Minimum

1

#### Required

#### Example

```ts
5
```
