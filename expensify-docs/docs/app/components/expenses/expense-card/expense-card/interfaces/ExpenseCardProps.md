# Interface: ExpenseCardProps

Props for the ExpenseCard component
 ExpenseCardProps

## Properties

### expense

> **expense**: [`ExpenseCardData`](ExpenseCardData.md)

The expense data to display

***

### isLoading?

> `optional` **isLoading**: `boolean`

Whether the card is in a loading state

***

### className?

> `optional` **className**: `string`

Additional CSS classes to apply to the card

***

### isAuthor?

> `optional` **isAuthor**: `boolean`

Whether the current user is the author (controls edit/delete permissions)

***

### onEdit()?

> `optional` **onEdit**: (`id`) => `void`

Callback when edit action is triggered

#### Parameters

##### id

`string`

#### Returns

`void`

***

### onDelete()?

> `optional` **onDelete**: (`id`) => `void` \| `Promise`\<`void`\>

Callback when delete is confirmed

#### Parameters

##### id

`string`

#### Returns

`void` \| `Promise`\<`void`\>

***

### disabled?

> `optional` **disabled**: `boolean`

Whether the card interactions are disabled

***

### onTagClick()?

> `optional` **onTagClick**: (`tag`) => `void`

Callback when a tag is clicked

#### Parameters

##### tag

`string`

#### Returns

`void`
