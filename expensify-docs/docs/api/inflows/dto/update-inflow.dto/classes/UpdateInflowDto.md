# Class: UpdateInflowDto

Data Transfer Object for updating an existing inflow record.

## Description

This DTO handles partial updates of inflow records. All fields are optional,
allowing for updating only specific fields while leaving others unchanged.
Each provided field must still pass validation before the update is processed.

## Example

```ts
// Update just the amount
{
  amount: 3000.0
}

// Update multiple fields
{
  amount: 3000.0,
  description: 'Updated salary amount',
  tags: ['salary', 'bonus']
}
```

## Constructors

### new UpdateInflowDto()

> **new UpdateInflowDto**(): [`UpdateInflowDto`](UpdateInflowDto.md)

#### Returns

[`UpdateInflowDto`](UpdateInflowDto.md)

## Properties

### amount?

> `optional` **amount**: `number`

The new monetary amount to set for the inflow transaction.
When provided, must be a positive number greater than 0.01.

#### Minimum

0.01

#### Optional

#### Example

```ts
3000.0
```

***

### description?

> `optional` **description**: `string`

The new description to set for the inflow.
When provided, must be between 3 and 255 characters.
Used to update the context or explanation of the inflow.

#### Min Length

3

#### Max Length

255

#### Optional

#### Example

```ts
"Monthly salary with performance bonus"
```

***

### tags?

> `optional` **tags**: `string`[]

The new array of tags to set for the inflow.
When provided, must contain at least one tag.
Each tag must be a non-empty string.
Used to update the categorization of the inflow.

#### Optional

#### Min Items

1

#### Example

```ts
['salary', 'bonus', 'performance']
```
