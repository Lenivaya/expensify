# Interface: ExpenseListContainerProps

Props for the ExpenseListContainer component
 ExpenseListContainerProps

## Properties

### expenses

> **expenses**: [`ExpenseCardData`](../../../expense-card/expense-card/interfaces/ExpenseCardData.md)[]

Array of expense data to display

***

### isLoading?

> `optional` **isLoading**: `boolean`

Whether the container is in a loading state

***

### className?

> `optional` **className**: `string`

Additional CSS classes to apply

***

### defaultLayout?

> `optional` **defaultLayout**: [`ExpenseCardLayout`](../../../expense-card-list/expense-card-list/type-aliases/ExpenseCardLayout.md)

Initial layout mode for the expense list

***

### showLayoutToggle?

> `optional` **showLayoutToggle**: `boolean`

Whether to show layout toggle controls

***

### showSortOptions?

> `optional` **showSortOptions**: `boolean`

Whether to show sorting options

***

### currentUserId?

> `optional` **currentUserId**: [`Option`](../../../../../lib/utils/type-aliases/Option.md)\<`string`\>

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

### onSearch()

> **onSearch**: (`value`) => `void`

Callback when search query changes

#### Parameters

##### value

[`Option`](../../../../../lib/utils/type-aliases/Option.md)\<`string`\>

#### Returns

`void`

***

### onPaginationChange()?

> `optional` **onPaginationChange**: (`pagination`) => `void`

Callback when page changes

#### Parameters

##### pagination

[`PaginationMeta`](PaginationMeta.md)

#### Returns

`void`

***

### pagination?

> `optional` **pagination**: [`PaginationMeta`](PaginationMeta.md)

Current pagination state

***

### searchPlaceholder?

> `optional` **searchPlaceholder**: `string`

Placeholder text for search input

***

### header?

> `optional` **header**: `ReactNode`

Custom header content

***

### footer?

> `optional` **footer**: `ReactNode`

Custom footer content

***

### enableHoverEffect?

> `optional` **enableHoverEffect**: `boolean`

Whether to enable hover effects

***

### hoverIntensity?

> `optional` **hoverIntensity**: `"low"` \| `"medium"` \| `"high"`

Intensity of hover effects

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
