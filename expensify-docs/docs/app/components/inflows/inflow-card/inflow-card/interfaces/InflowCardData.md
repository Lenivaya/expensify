# Interface: InflowCardData

Data transfer object representing inflow information
 InflowCardData

## Description

Represents the core data structure for an inflow entry, including
financial details, metadata, and timestamps.

## Properties

### id

> **id**: `string`

Unique identifier for the inflow

***

### amount

> **amount**: `string`

Pre-formatted amount from backend (e.g., "$1,234.56")

***

### description

> **description**: `null` \| `string`

Optional description of the inflow

***

### tags

> **tags**: `string`[]

Array of tags associated with the inflow

***

### userId

> **userId**: `string`

UUID of the user who owns this inflow

***

### updatedAt

> **updatedAt**: `null` \| `string`

ISO timestamp of last update

***

### createdAt

> **createdAt**: `string`

ISO timestamp of creation
