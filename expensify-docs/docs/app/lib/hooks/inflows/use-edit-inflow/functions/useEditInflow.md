# Function: useEditInflow()

> **useEditInflow**(): `object`

Hook for editing inflows

## Returns

`object`

An object with functions and state for editing inflows

### openEditDialog()

> **openEditDialog**: (`id`) => `void`

#### Parameters

##### id

`string`

#### Returns

`void`

### closeEditDialog()

> **closeEditDialog**: () => `void`

#### Returns

`void`

### handleSubmit()

> **handleSubmit**: (`values`) => `Promise`\<`void`\>

#### Parameters

##### values

###### amount

`number` = `...`

###### description

`string` = `...`

###### tags

`string`[] = `...`

#### Returns

`Promise`\<`void`\>

### isOpen

> **isOpen**: `boolean`

### setIsOpen

> **setIsOpen**: `Dispatch`\<`SetStateAction`\<`boolean`\>\>

### isLoading

> **isLoading**: `boolean`

### isSubmitting

> **isSubmitting**: `boolean`

### defaultValues

> **defaultValues**: `undefined` \| \{ `amount`: `number`; `description`: `string`; `tags`: `string`[]; \}

### currentInflow

> **currentInflow**: `undefined` \| \{\}
