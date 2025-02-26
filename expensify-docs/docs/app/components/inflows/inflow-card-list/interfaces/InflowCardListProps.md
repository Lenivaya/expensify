# Interface: InflowCardListProps

Props for the InflowCardList component
 InflowCardListProps

## Properties

### inflows

> **inflows**: [`InflowCardData`](../../inflow-card/inflow-card/interfaces/InflowCardData.md)[]

Array of inflow data to display

***

### isLoading?

> `optional` **isLoading**: `boolean`

Whether the list is in a loading state

***

### className?

> `optional` **className**: `string`

Additional CSS classes to apply

***

### defaultLayout?

> `optional` **defaultLayout**: [`InflowCardLayout`](../type-aliases/InflowCardLayout.md)

Initial layout mode

***

### showLayoutToggle?

> `optional` **showLayoutToggle**: `boolean`

Whether to show layout toggle controls

***

### showSortOptions?

> `optional` **showSortOptions**: `boolean`

Whether to show sort options

***

### maxHeight?

> `optional` **maxHeight**: `number`

Maximum height of the list container

***

### currentUserId

> **currentUserId**: `string`

ID of the current user for edit permissions

***

### onEdit()?

> `optional` **onEdit**: (`id`) => `void`

Callback when edit is requested

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

### header?

> `optional` **header**: `ReactNode`

Custom header content

***

### footer?

> `optional` **footer**: `ReactNode`

Custom footer content

***

### selectedTags?

> `optional` **selectedTags**: `string`[]

Currently selected tags for filtering

***

### onTagSelect()?

> `optional` **onTagSelect**: (`tag`) => `void`

Callback when a tag is selected

#### Parameters

##### tag

`string`

#### Returns

`void`

***

### onTagRemove()?

> `optional` **onTagRemove**: (`tag`) => `void`

Callback when a tag is removed

#### Parameters

##### tag

`string`

#### Returns

`void`
