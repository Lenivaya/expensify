# Class: ExpenseDto

Data Transfer Object representing a complete expense record.

## Description

This DTO extends the Zod schema from the database to provide complete type safety
and validation for expense records. It represents the full shape of an expense
including system-generated fields like ID and timestamps.

## Example

```ts
{
 *   id: 'clf12345-6789-abcd-efgh-ijklmnopqrst',
 *   amount: 29.99,
 *   description: 'Grocery shopping',
 *   tags: ['food', 'groceries'],
 *   createdAt: '2024-02-26T10:00:00.000Z',
 *   updatedAt: '2024-02-26T10:00:00.000Z'
 * }
```

## Extends

- `object`

## Constructors

### new ExpenseDto()

> **new ExpenseDto**(): [`ExpenseDto`](ExpenseDto.md)

#### Returns

[`ExpenseDto`](ExpenseDto.md)

#### Inherited from

`createZodDto(expenseSelectSchema).constructor`

## Properties

### updatedAt

> **updatedAt**: `null` \| `Date`

ISO 8601 timestamp of the last update to the record

#### Inherited from

`createZodDto(expenseSelectSchema).updatedAt`

***

### createdAt

> **createdAt**: `Date`

ISO 8601 timestamp of when the record was created

#### Inherited from

`createZodDto(expenseSelectSchema).createdAt`

***

### deletedAt

> **deletedAt**: `null` \| `Date`

#### Inherited from

`createZodDto(expenseSelectSchema).deletedAt`

***

### id

> **id**: `string`

Unique identifier for the expense record (UUID v4 format)

#### Inherited from

`createZodDto(expenseSelectSchema).id`

***

### amount

> **amount**: `string`

The monetary value of the expense (minimum: 0.01)

#### Inherited from

`createZodDto(expenseSelectSchema).amount`

***

### description

> **description**: `null` \| `string`

Detailed explanation of the expense (3-255 characters)

#### Inherited from

`createZodDto(expenseSelectSchema).description`

***

### tags

> **tags**: `string`[]

Array of categorization tags (minimum: 1 tag)

#### Inherited from

`createZodDto(expenseSelectSchema).tags`

***

### userId

> **userId**: `string`

#### Inherited from

`createZodDto(expenseSelectSchema).userId`
