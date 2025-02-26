# Interface: EditExpenseDialogProps

Props for the EditExpenseDialog component
 EditExpenseDialogProps

## Properties

### isOpen

> **isOpen**: `boolean`

Whether the dialog is currently open

***

### setIsOpen()

> **setIsOpen**: (`isOpen`) => `void`

Callback to control dialog visibility

#### Parameters

##### isOpen

`boolean`

#### Returns

`void`

***

### handleSubmit()

> **handleSubmit**: (`values`) => `Promise`\<`void`\>

Callback when form is submitted

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

***

### isLoading

> **isLoading**: `boolean`

Whether the expense data is being loaded

***

### isSubmitting

> **isSubmitting**: `boolean`

Whether the form is currently submitting

***

### defaultValues?

> `optional` **defaultValues**: `Partial`\<\{ `amount`: `number`; `description`: `string`; `tags`: `string`[]; \}\>

Initial values for the form
