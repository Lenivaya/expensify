# Class: TagSummaryItemDto

Data Transfer Object representing a single tag with its associated financial data.

This DTO contains information about a specific tag, including its name,
the total monetary amount associated with it, and the type of transactions
it represents (either inflow or expense).

## Example

```ts
{
 *   tag: "groceries",
 *   amount: 500.00,
 *   type: "expense"
 * }
```

## Constructors

### new TagSummaryItemDto()

> **new TagSummaryItemDto**(): [`TagSummaryItemDto`](TagSummaryItemDto.md)

#### Returns

[`TagSummaryItemDto`](TagSummaryItemDto.md)

## Properties

### tag

> **tag**: `string`

***

### amount

> **amount**: `number`

***

### type

> **type**: `"inflow"` \| `"expense"`
