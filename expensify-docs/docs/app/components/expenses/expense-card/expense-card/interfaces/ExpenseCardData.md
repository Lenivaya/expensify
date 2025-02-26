# Interface: ExpenseCardData

Data transfer object representing expense information
 ExpenseCardData

## Properties

### id

> **id**: `string`

Unique identifier for the expense

***

### amount

> **amount**: `string`

Pre-formatted amount from backend (e.g., "-$50.00")

***

### description

> **description**: `null` \| `string`

Optional description of the expense

***

### tags

> **tags**: `string`[]

Array of tags associated with the expense

***

### userId

> **userId**: [`Option`](../../../../../lib/utils/type-aliases/Option.md)\<`string`\>

UUID of the user who owns this expense

***

### updatedAt

> **updatedAt**: `null` \| `string`

ISO timestamp of last update

***

### createdAt

> **createdAt**: `string`

ISO timestamp of creation
