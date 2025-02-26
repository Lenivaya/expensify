# Variable: expenseSchema

> `const` **expenseSchema**: `ZodObject`\<\{ `amount`: `ZodNumber`; `description`: `ZodString`; `tags`: `ZodDefault`\<`ZodArray`\<`ZodString`, `"many"`\>\>; \}, `"strip"`, `ZodTypeAny`, \{ `amount`: `number`; `description`: `string`; `tags`: `string`[]; \}, \{ `amount`: `number`; `description`: `string`; `tags`: `string`[]; \}\>

Schema for validating expense form data

## Remarks

- Amount must be between 0.01 and 1,000,000
- Description must be between 3 and 100 characters
- Tags are optional but must follow specific format rules if provided
