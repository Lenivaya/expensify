# Class: UpdateExpenseDto

Data Transfer Object for updating an existing expense record.

## Description

This DTO handles partial updates of expense records. All fields are optional,
allowing for updating only specific fields while leaving others unchanged.
Each provided field must still pass validation before the update is processed.

## Example

```ts
// Update just the amount
{
  amount: 35.50
}

// Update multiple fields
{
  amount: 35.50,
  description: 'Updated grocery list with extra items',
  tags: ['food', 'groceries', 'household']
}
```

## Constructors

### new UpdateExpenseDto()

> **new UpdateExpenseDto**(): [`UpdateExpenseDto`](UpdateExpenseDto.md)

#### Returns

[`UpdateExpenseDto`](UpdateExpenseDto.md)

## Properties

### amount?

> `optional` **amount**: `number`

The new monetary amount to set for the expense transaction.
When provided, must be a positive number greater than 0.01.

#### Minimum

0.01

#### Optional

#### Example

```ts
35.50
```

***

### description?

> `optional` **description**: `string`

The new description to set for the expense.
When provided, must be between 3 and 255 characters.
Used to update the context or explanation of the expense.

#### Min Length

3

#### Max Length

255

#### Optional

#### Example

```ts
"Updated grocery list with extra items"
```

***

### tags?

> `optional` **tags**: `string`[]

The new array of tags to set for the expense.
When provided, must contain at least one tag.
Each tag must be a non-empty string.
Used to update the categorization of the expense.

#### Optional

#### Min Items

1

#### Example

```ts
['food', 'groceries', 'household']
```
