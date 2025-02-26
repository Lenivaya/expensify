# Class: InflowDto

Data Transfer Object representing a complete inflow record.

## Description

This DTO extends the Zod schema from the database to provide complete type safety
and validation for inflow records. It represents the full shape of an inflow
including system-generated fields like ID and timestamps.

## Example

```ts
{
 *   id: 'clf12345-6789-abcd-efgh-ijklmnopqrst',
 *   amount: 2500.0,
 *   description: 'Monthly salary',
 *   tags: ['salary', 'work'],
 *   createdAt: '2024-02-26T10:00:00.000Z',
 *   updatedAt: '2024-02-26T10:00:00.000Z'
 * }
```

## Extends

- `object`

## Constructors

### new InflowDto()

> **new InflowDto**(): [`InflowDto`](InflowDto.md)

#### Returns

[`InflowDto`](InflowDto.md)

#### Inherited from

`createZodDto(inflowSelectSchema).constructor`

## Properties

### updatedAt

> **updatedAt**: `null` \| `Date`

ISO 8601 timestamp of the last update to the record

#### Inherited from

`createZodDto(inflowSelectSchema).updatedAt`

***

### createdAt

> **createdAt**: `Date`

ISO 8601 timestamp of when the record was created

#### Inherited from

`createZodDto(inflowSelectSchema).createdAt`

***

### deletedAt

> **deletedAt**: `null` \| `Date`

#### Inherited from

`createZodDto(inflowSelectSchema).deletedAt`

***

### id

> **id**: `string`

Unique identifier for the inflow record (UUID v4 format)

#### Inherited from

`createZodDto(inflowSelectSchema).id`

***

### amount

> **amount**: `string`

The monetary value of the inflow (minimum: 0.01)

#### Inherited from

`createZodDto(inflowSelectSchema).amount`

***

### description

> **description**: `null` \| `string`

Detailed explanation of the inflow (3-255 characters)

#### Inherited from

`createZodDto(inflowSelectSchema).description`

***

### tags

> **tags**: `string`[]

Array of categorization tags (minimum: 1 tag)

#### Inherited from

`createZodDto(inflowSelectSchema).tags`

***

### userId

> **userId**: `string`

#### Inherited from

`createZodDto(inflowSelectSchema).userId`
