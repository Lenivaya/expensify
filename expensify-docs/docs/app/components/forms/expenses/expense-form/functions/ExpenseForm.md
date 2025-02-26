# Function: ExpenseForm()

> **ExpenseForm**(`__namedParameters`): `Element`

A form component for creating and editing expenses

## Parameters

### \_\_namedParameters

[`ExpenseFormProps`](../interfaces/ExpenseFormProps.md)

## Returns

`Element`

## Description

This component provides a form interface for users to input or modify expense details.
It includes fields for amount, description, and tags with real-time validation and formatting.

Features:
- Real-time amount formatting with currency display
- Tag management with suggestions and validation
- Support for both create and edit modes
- Accessible form controls with ARIA labels
- Responsive design with mobile-friendly inputs

## Example

```tsx
// Create mode
<ExpenseForm
  onSubmit={handleSubmit}
  isSubmitting={isLoading}
/>

// Edit mode
<ExpenseForm
  onSubmit={handleUpdate}
  defaultValues={existingExpense}
  isEditing={true}
  isSubmitting={isUpdating}
/>
```
