# Interface: ExpenseFormProps

Props for the ExpenseForm component

## Properties

### onSubmit()

> **onSubmit**: (`values`) => `Promise`\<`void`\>

Callback function that handles form submission

#### Parameters

##### values

The validated form values

###### amount

`number` = `...`

###### description

`string` = `...`

###### tags

`string`[] = `...`

#### Returns

`Promise`\<`void`\>

A promise that resolves when the submission is complete

***

### defaultValues?

> `optional` **defaultValues**: `Partial`\<\{ `amount`: `number`; `description`: `string`; `tags`: `string`[]; \}\>

Optional initial values for the form fields

#### Remarks

- If provided, the form will be pre-filled with these values
- Useful for edit mode where you want to show existing expense data

***

### isEditing?

> `optional` **isEditing**: `boolean`

Flag indicating if the form is in edit mode

#### Remarks

Changes the form's behavior and UI elements to reflect editing an existing expense

#### Default

```ts
false
```

***

### isSubmitting?

> `optional` **isSubmitting**: `boolean`

Flag indicating if the form is currently submitting

#### Remarks

When true, disables form inputs and shows loading state

#### Default

```ts
false
```

***

### className?

> `optional` **className**: `string`

Optional CSS class name for styling the form container

***

### title?

> `optional` **title**: `string`

Optional custom title for the form

#### Remarks

If not provided, defaults to "Create New Expense" or "Edit Expense" based on isEditing

***

### description?

> `optional` **description**: `string`

Optional custom description for the form

#### Remarks

If not provided, defaults to a context-appropriate description based on isEditing
