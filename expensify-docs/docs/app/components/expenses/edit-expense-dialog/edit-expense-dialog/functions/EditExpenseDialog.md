# Function: EditExpenseDialog()

> **EditExpenseDialog**(`props`): `ReactNode` \| `Promise`\<`ReactNode`\>

A dialog component for editing expense entries

## Parameters

### props

[`EditExpenseDialogProps`](../interfaces/EditExpenseDialogProps.md)

## Returns

`ReactNode` \| `Promise`\<`ReactNode`\>

## Description

This component provides a modal dialog interface for editing existing expenses.
It wraps the ExpenseForm component in a dialog context and handles loading states.

Features:
- Modal dialog with backdrop
- Loading spinner during data fetch
- Form for editing expense details
- Controlled open/close state
- Responsive design

## Example

```tsx
<EditExpenseDialog
  isOpen={isDialogOpen}
  setIsOpen={setDialogOpen}
  handleSubmit={handleUpdateExpense}
  isLoading={isFetching}
  isSubmitting={isUpdating}
  defaultValues={{
    amount: 50.00,
    description: 'Grocery shopping',
    tags: ['food', 'essentials']
  }}
/>
```
