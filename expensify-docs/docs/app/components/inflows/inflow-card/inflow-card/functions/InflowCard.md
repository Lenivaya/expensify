# Function: InflowCard()

> **InflowCard**(`props`): `ReactNode` \| `Promise`\<`ReactNode`\>

A card component for displaying individual inflow entries

## Parameters

### props

[`InflowCardProps`](../interfaces/InflowCardProps.md)

## Returns

`ReactNode` \| `Promise`\<`ReactNode`\>

## Description

This component displays inflow information in a card format with interactive
features like editing, deletion, and tag management. It includes optimizations
for performance and a rich set of user interactions.

Features:
- Responsive layout with flexible width
- Edit and delete capabilities for authors
- Interactive tags with click handling
- Loading state with skeleton UI
- Relative and absolute timestamp display
- Optimized rendering with memoization
- Accessible tooltips and hover cards
- Delete confirmation dialog
- Visual feedback for user interactions

## Example

```tsx
<InflowCard
  inflow={{
    id: '123',
    amount: '$1,000.00',
    description: 'Monthly salary',
    tags: ['income', 'salary'],
    userId: 'user123',
    createdAt: '2024-02-25T12:00:00Z',
    updatedAt: null
  }}
  isAuthor={true}
  onEdit={handleEdit}
  onDelete={handleDelete}
  onTagClick={handleTagClick}
/>
```
