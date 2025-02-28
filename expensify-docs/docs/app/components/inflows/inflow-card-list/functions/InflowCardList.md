# Function: InflowCardList()

> **InflowCardList**(`props`): `ReactNode` \| `Promise`\<`ReactNode`\>

A flexible component for displaying a list of inflow cards with various layout and sorting options

## Parameters

### props

[`InflowCardListProps`](../interfaces/InflowCardListProps.md)

## Returns

`ReactNode` \| `Promise`\<`ReactNode`\>

## Description

This component provides a customizable way to display inflow cards with support for
different layouts (grid, feed, compact), sorting options, and tag filtering. It includes
performance optimizations for handling large lists of inflows.

Features:
- Multiple layout options (grid, feed, compact)
- Sorting by date and amount
- Tag filtering system
- Loading state with skeletons
- Responsive design
- Optimized rendering with memoization
- Customizable header and footer

## Example

```tsx
<InflowCardList
  inflows={inflows}
  defaultLayout="grid"
  showLayoutToggle={true}
  showSortOptions={true}
  currentUserId={currentUser.id}
  onEdit={handleEdit}
  onDelete={handleDelete}
  selectedTags={['salary', 'investment']}
  onTagSelect={handleTagSelect}
  onTagRemove={handleTagRemove}
/>
```
