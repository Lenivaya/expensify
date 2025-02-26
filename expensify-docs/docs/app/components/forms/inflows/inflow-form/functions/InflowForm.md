# Function: InflowForm()

> **InflowForm**(`__namedParameters`): `Element`

A form component for recording and editing monetary inflows

## Parameters

### \_\_namedParameters

[`InflowFormProps`](../interfaces/InflowFormProps.md)

## Returns

`Element`

## Description

This component provides a form interface for users to record or modify income and other monetary inflows.
It includes fields for amount, description, and tags with real-time validation and formatting.

Features:
- Real-time amount formatting with currency display
- Tag management with income-specific suggestions
- Support for both create and edit modes
- Accessible form controls with ARIA labels
- Emerald-themed UI elements for positive financial transactions
- Responsive design with mobile-friendly inputs

## Example

```tsx
// Create mode
<InflowForm
  onSubmit={handleSubmit}
  isSubmitting={isLoading}
/>

// Edit mode
<InflowForm
  onSubmit={handleUpdate}
  defaultValues={existingInflow}
  isEditing={true}
  isSubmitting={isUpdating}
/>
```
