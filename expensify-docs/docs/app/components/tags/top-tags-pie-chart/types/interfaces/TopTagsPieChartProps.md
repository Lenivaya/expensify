# Interface: TopTagsPieChartProps

## Properties

### tagStats

> **tagStats**: [`TagSummaryItemDto`](../type-aliases/TagSummaryItemDto.md)[]

Array of tag summary items to display in the chart

***

### height?

> `optional` **height**: `number`

Height of the chart in pixels

#### Default

```ts
undefined
```

***

### className?

> `optional` **className**: `string`

Additional CSS classes to apply to the chart container

***

### defaultView?

> `optional` **defaultView**: `"all"` \| `"inflow"` \| `"expense"`

Default selected view type

#### Default

```ts
'all'
```

***

### title?

> `optional` **title**: `string`

Title text displayed above the chart

#### Default

```ts
'Tag Distribution'
```

***

### description?

> `optional` **description**: `string`

Description text displayed below the title

#### Default

```ts
'Overview of your transaction tags'
```

***

### showLegend?

> `optional` **showLegend**: `boolean`

Whether to show the chart legend

#### Default

```ts
true
```

***

### labelMinPercentage?

> `optional` **labelMinPercentage**: `number`

Minimum percentage threshold for a segment to show its label

#### Default

```ts
0
```

***

### pieMinPercentage?

> `optional` **pieMinPercentage**: `number`

Minimum percentage threshold for a segment to be included in the pie chart

#### Default

```ts
undefined
```
