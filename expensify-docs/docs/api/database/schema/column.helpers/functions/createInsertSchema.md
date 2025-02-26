# Function: createInsertSchema()

## Call Signature

> **createInsertSchema**\<`TTable`\>(`table`): `BuildSchema`\<`"insert"`, `TTable`\[`"_"`\]\[`"columns"`\], `undefined`\>

### Type Parameters

• **TTable** *extends* `Table`\<`TableConfig`\<`Column`\<`any`, `object`, `object`\>\>\>

### Parameters

#### table

`TTable`

### Returns

`BuildSchema`\<`"insert"`, `TTable`\[`"_"`\]\[`"columns"`\], `undefined`\>

## Call Signature

> **createInsertSchema**\<`TTable`, `TRefine`\>(`table`, `refine`?): `BuildSchema`\<`"insert"`, `TTable`\[`"_"`\]\[`"columns"`\], `TRefine`\>

### Type Parameters

• **TTable** *extends* `Table`\<`TableConfig`\<`Column`\<`any`, `object`, `object`\>\>\>

• **TRefine** *extends* `object`

### Parameters

#### table

`TTable`

#### refine?

`NoUnknownKeys`\<`TRefine`, `TTable`\[`"$inferInsert"`\]\>

### Returns

`BuildSchema`\<`"insert"`, `TTable`\[`"_"`\]\[`"columns"`\], `TRefine`\>
