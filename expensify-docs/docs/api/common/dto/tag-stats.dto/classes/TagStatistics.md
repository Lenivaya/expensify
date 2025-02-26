# Class: TagStatistics

Data Transfer Object for tag-based statistics aggregation.

## Description

This DTO represents aggregated statistics for a specific tag,
including how many times it appears and the total monetary value
associated with it. Used for analyzing spending or income patterns
by category/tag.

## Example

```ts
{
 *   tag: 'groceries',
 *   count: 12,
 *   total: 450.75
 * }
```

## Constructors

### new TagStatistics()

> **new TagStatistics**(): [`TagStatistics`](TagStatistics.md)

#### Returns

[`TagStatistics`](TagStatistics.md)

## Properties

### tag

> **tag**: `string`

The tag name for which statistics are calculated.
Tags are used to categorize transactions.

#### Min Length

1

#### Required

#### Example

```ts
"groceries"
```

***

### count

> **count**: `number`

Number of times this tag appears in the dataset.
Represents how many transactions are marked with this tag.

#### Minimum

0

#### Required

#### Example

```ts
12
```

***

### total

> **total**: `number`

Total monetary value associated with this tag.
For expenses, this is the total spent in this category.
For inflows, this is the total income from this category.

#### Minimum

0

#### Required

#### Example

```ts
450.75
```
