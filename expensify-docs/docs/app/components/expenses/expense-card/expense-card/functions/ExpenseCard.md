# Function: ExpenseCard()

> **ExpenseCard**(`__namedParameters`): `Element`

A card component for displaying individual expense entries

## Parameters

### \_\_namedParameters

[`ExpenseCardProps`](../interfaces/ExpenseCardProps.md)

## Returns

`Element`

## Description

This component displays expense information in a card format with support for
various interactions like editing, deleting, and tag management. It includes
features for displaying monetary amounts, dates, descriptions, and tags.

Features:
- Responsive card layout with hover effects
- Edit and delete actions for expense owners
- Tag display and interaction
- Date formatting with relative and absolute time
- Loading state support
- Accessibility features
- Delete confirmation dialog
- Memoized subcomponents for performance

## Example

```tsx
<ExpenseCard
  expense={{
    id: '123',
    amount: '-$50.00',
    description: 'Grocery shopping',
    tags: ['food', 'essentials'],
    userId: 'user123',
    createdAt: '2024-02-25T12:00:00Z',
    updatedAt: null
  }}
  isAuthor={true}
  onEdit={(id) => handleEdit(id)}
  onDelete={(id) => handleDelete(id)}
  onTagClick={(tag) => handleTagFilter(tag)}
/>
```
