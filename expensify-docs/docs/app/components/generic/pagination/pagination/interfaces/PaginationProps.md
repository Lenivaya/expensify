# Interface: PaginationProps

## Properties

### meta

> **meta**: [`PaginationMeta`](PaginationMeta.md)

Current pagination meta information

***

### onPageChange()

> **onPageChange**: (`page`) => `void`

Callback fired when page changes

#### Parameters

##### page

`number`

#### Returns

`void`

***

### onLimitChange()?

> `optional` **onLimitChange**: (`limit`) => `void`

Callback fired when items per page changes

#### Parameters

##### limit

`number`

#### Returns

`void`

***

### pageSizeOptions?

> `optional` **pageSizeOptions**: `number`[]

Available page size options

#### Default

```ts
[10, 20, 30, 40, 50]
```

***

### showPageSize?

> `optional` **showPageSize**: `boolean`

Whether to show the page size selector

#### Default

```ts
true
```

***

### showInfo?

> `optional` **showInfo**: `boolean`

Whether to show the results information

#### Default

```ts
true
```

***

### icons?

> `optional` **icons**: [`PaginationIconProps`](PaginationIconProps.md)

Custom icons for navigation buttons

***

### labels?

> `optional` **labels**: [`PaginationLabelsProps`](PaginationLabelsProps.md)

Custom labels for text elements

***

### styles?

> `optional` **styles**: [`PaginationStylesProps`](PaginationStylesProps.md)

Custom styles for different sections

***

### ~~className?~~

> `optional` **className**: `string`

Custom className for the container

#### Deprecated

Use styles.container instead
