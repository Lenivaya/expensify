# Class: CreateInflowDto

Data Transfer Object for creating a new inflow record.
Contains all required fields for creating an inflow entry in the system.

## Description

This DTO validates and transfers data for creating new income entries.
All fields are required and must pass validation before the inflow can be created.

## Example

```ts
{
 *   amount: 2500.0,
 *   description: 'Monthly salary',
 *   tags: ['salary', 'work']
 * }
```

## Constructors

### new CreateInflowDto()

> **new CreateInflowDto**(): [`CreateInflowDto`](CreateInflowDto.md)

#### Returns

[`CreateInflowDto`](CreateInflowDto.md)

## Properties

### amount

> **amount**: `number`

The monetary amount of the inflow transaction.
Must be a positive number greater than 0.01.

#### Minimum

0.01

#### Required

#### Example

```ts
2500.0
```

***

### description

> **description**: `string`

A descriptive text explaining the source or purpose of the inflow.
Used to provide context and help with record keeping.

#### Min Length

3

#### Max Length

255

#### Required

#### Example

```ts
"Monthly salary"
```

***

### tags

> **tags**: `string`[]

Array of tags used to categorize and organize the inflow.
Must contain at least one tag. Each tag must be a non-empty string.
Tags help with filtering and organizing inflows by categories.

#### Required

#### Min Items

1

#### Example

```ts
['salary', 'work']
```
