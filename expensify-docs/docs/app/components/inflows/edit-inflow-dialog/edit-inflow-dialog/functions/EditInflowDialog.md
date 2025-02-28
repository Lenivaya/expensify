# Function: EditInflowDialog()

> **EditInflowDialog**(`props`): `ReactNode` \| `Promise`\<`ReactNode`\>

A dialog component for editing inflow entries

## Parameters

### props

[`EditInflowDialogProps`](../interfaces/EditInflowDialogProps.md)

## Returns

`ReactNode` \| `Promise`\<`ReactNode`\>

## Description

This component provides a modal dialog interface for editing existing inflows.
It wraps the InflowForm component in a dialog context and handles loading states.

Features:
- Modal dialog with backdrop
- Loading spinner during data fetch
- Form for editing inflow details
- Controlled open/close state
- Responsive design

## Example

```tsx
<EditInflowDialog
  isOpen={isDialogOpen}
  setIsOpen={setDialogOpen}
  handleSubmit={handleUpdateInflow}
  isLoading={isFetching}
  isSubmitting={isUpdating}
  defaultValues={{
    amount: 50.00,
    description: 'Salary payment',
    tags: ['income', 'salary']
  }}
/>
```
