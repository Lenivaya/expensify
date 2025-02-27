# Function: ExpenseListContainer()

> **ExpenseListContainer**(`__namedParameters`): `Element`

A container component that provides a complete expense management interface

## Parameters

### \_\_namedParameters

[`ExpenseListContainerProps`](../interfaces/ExpenseListContainerProps.md)

## Returns

`Element`

## Description

This component serves as a high-level container for managing and displaying expenses.
It combines search functionality, pagination, and the expense card list with additional
features like tag filtering and hover effects.

Features:
- Search functionality for expenses
- Pagination controls with dynamic page number display
- Tag filtering system
- Customizable layout options
- Loading states
- Hover effects with configurable intensity
- Responsive design
- Optimized performance with memoization

## Example

```tsx
<ExpenseListContainer
  expenses={expenses}
  isLoading={isLoading}
  currentUserId={currentUser.id}
  onEdit={handleEdit}
  onDelete={handleDelete}
  onSearch={handleSearch}
  onPaginationChange={handlePageChange}
  pagination={{
    page: 1,
    limit: 10,
    total: 100,
    pageCount: 10
  }}
  selectedTags={selectedTags}
  onTagSelect={handleTagSelect}
  onTagRemove={handleTagRemove}
/>
```
