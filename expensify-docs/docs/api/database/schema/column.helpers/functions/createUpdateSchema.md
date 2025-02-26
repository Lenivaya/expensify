# Function: createUpdateSchema()

## Call Signature

> **createUpdateSchema**\<`TTable`\>(`table`): `BuildSchema`\<`"update"`, `TTable`\[`"_"`\]\[`"columns"`\], `undefined`\>

### Type Parameters

• **TTable** *extends* `Table`\<`TableConfig`\<`Column`\<`any`, `object`, `object`\>\>\>

### Parameters

#### table

`TTable`

### Returns

`BuildSchema`\<`"update"`, `TTable`\[`"_"`\]\[`"columns"`\], `undefined`\>

## Call Signature

> **createUpdateSchema**\<`TTable`, `TRefine`\>(`table`, `refine`?): `BuildSchema`\<`"update"`, `TTable`\[`"_"`\]\[`"columns"`\], `TRefine`\>

### Type Parameters

• **TTable** *extends* `Table`\<`TableConfig`\<`Column`\<`any`, `object`, `object`\>\>\>

• **TRefine** *extends* `object`

### Parameters

#### table

`TTable`

#### refine?

`TRefine`

### Returns

`BuildSchema`\<`"update"`, `TTable`\[`"_"`\]\[`"columns"`\], `TRefine`\>
