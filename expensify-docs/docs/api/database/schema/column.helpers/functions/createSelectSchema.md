# Function: createSelectSchema()

## Call Signature

> **createSelectSchema**\<`TTable`\>(`table`): `BuildSchema`\<`"select"`, `TTable`\[`"_"`\]\[`"columns"`\], `undefined`\>

### Type Parameters

• **TTable** *extends* `Table`\<`TableConfig`\<`Column`\<`any`, `object`, `object`\>\>\>

### Parameters

#### table

`TTable`

### Returns

`BuildSchema`\<`"select"`, `TTable`\[`"_"`\]\[`"columns"`\], `undefined`\>

## Call Signature

> **createSelectSchema**\<`TTable`, `TRefine`\>(`table`, `refine`?): `BuildSchema`\<`"select"`, `TTable`\[`"_"`\]\[`"columns"`\], `TRefine`\>

### Type Parameters

• **TTable** *extends* `Table`\<`TableConfig`\<`Column`\<`any`, `object`, `object`\>\>\>

• **TRefine** *extends* `object`

### Parameters

#### table

`TTable`

#### refine?

`NoUnknownKeys`\<`TRefine`, `TTable`\[`"$inferSelect"`\]\>

### Returns

`BuildSchema`\<`"select"`, `TTable`\[`"_"`\]\[`"columns"`\], `TRefine`\>

## Call Signature

> **createSelectSchema**\<`TView`\>(`view`): `BuildSchema`\<`"select"`, `TView`\[`"_"`\]\[`"selectedFields"`\], `undefined`\>

### Type Parameters

• **TView** *extends* `View`\<`string`, `boolean`, `ColumnsSelection`\>

### Parameters

#### view

`TView`

### Returns

`BuildSchema`\<`"select"`, `TView`\[`"_"`\]\[`"selectedFields"`\], `undefined`\>

## Call Signature

> **createSelectSchema**\<`TView`, `TRefine`\>(`view`, `refine`): `BuildSchema`\<`"select"`, `TView`\[`"_"`\]\[`"selectedFields"`\], `TRefine`\>

### Type Parameters

• **TView** *extends* `View`\<`string`, `boolean`, `ColumnsSelection`\>

• **TRefine** *extends* `object`

### Parameters

#### view

`TView`

#### refine

`NoUnknownKeys`\<`TRefine`, `TView`\[`"$inferSelect"`\]\>

### Returns

`BuildSchema`\<`"select"`, `TView`\[`"_"`\]\[`"selectedFields"`\], `TRefine`\>

## Call Signature

> **createSelectSchema**\<`TEnum`\>(`enum_`): `ZodEnum`\<`TEnum`\[`"enumValues"`\]\>

### Type Parameters

• **TEnum** *extends* `PgEnum`\<`any`\>

### Parameters

#### enum\_

`TEnum`

### Returns

`ZodEnum`\<`TEnum`\[`"enumValues"`\]\>
