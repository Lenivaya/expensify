# Class: TagSummaryDto

Data Transfer Object representing a summary of a user's top tags.

This DTO provides an overview of a user's most significant financial categories,
separated into inflow (income) tags and expense tags. Each category includes
the tag name and the total amount associated with it.

This information is useful for visualizing spending patterns and income sources.

## Example

```ts
{
 *   inflowTags: [
 *     { tag: "salary", amount: 3000.00, type: "inflow" },
 *     { tag: "freelance", amount: 500.00, type: "inflow" }
 *   ],
 *   expenseTags: [
 *     { tag: "rent", amount: 1200.00, type: "expense" },
 *     { tag: "groceries", amount: 500.00, type: "expense" }
 *   ]
 * }
```

## Constructors

### new TagSummaryDto()

> **new TagSummaryDto**(): [`TagSummaryDto`](TagSummaryDto.md)

#### Returns

[`TagSummaryDto`](TagSummaryDto.md)

## Properties

### inflowTags

> **inflowTags**: [`TagSummaryItemDto`](TagSummaryItemDto.md)[]

***

### expenseTags

> **expenseTags**: [`TagSummaryItemDto`](TagSummaryItemDto.md)[]
