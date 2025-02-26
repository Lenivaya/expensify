# Class: CreateExpenseDto

Data Transfer Object for creating a new expense record.
Contains all required fields for creating an expense entry in the system.

## Description

This DTO validates and transfers data for creating new expense entries.
All fields are required and must pass validation before the expense can be created.

## Example

```ts
{
 *   amount: 29.99,
 *   description: 'Grocery shopping',
 *   tags: ['food', 'groceries']
 * }
```

## Constructors

### new CreateExpenseDto()

> **new CreateExpenseDto**(): [`CreateExpenseDto`](CreateExpenseDto.md)

#### Returns

[`CreateExpenseDto`](CreateExpenseDto.md)

## Properties

### amount

> **amount**: `number`

The monetary amount of the expense transaction.
Must be a positive number greater than 0.01.

#### Minimum

0.01

#### Required

#### Example

```ts
29.99
```

***

### description

> **description**: `string`

A descriptive text explaining the purpose or nature of the expense.
Used to provide context and help with expense tracking.

#### Min Length

3

#### Max Length

255

#### Required

#### Example

```ts
"Grocery shopping"
```

***

### tags

> **tags**: `string`[]

Array of tags used to categorize and organize the expense.
Must contain at least one tag. Each tag must be a non-empty string.
Tags help with filtering and organizing expenses by categories.

#### Required

#### Min Items

1

#### Example

```ts
['food', 'groceries']
```
