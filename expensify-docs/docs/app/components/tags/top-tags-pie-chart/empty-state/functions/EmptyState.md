# Function: EmptyState()

> **EmptyState**(`props`): `ReactNode`

A component to display when there is no data for the pie chart

## Parameters

### props

`object`

## Returns

`ReactNode`

## Description

This component provides a visually appealing empty state for the pie chart
when there is no data to display. It includes an illustration and helpful text
to guide users.

Features:
- Accessible SVG illustration
- Informative message
- Responsive layout
- Memoized for performance
- ARIA labels for accessibility

Visual Elements:
- Bar chart illustration
- Primary message ("No data available")
- Secondary message with action hint
- Muted color scheme
- Centered layout with spacing

Accessibility:
- SVG has proper ARIA role and title
- Semantic HTML structure
- Proper text contrast

## Example

```tsx
// Usage in pie chart component
{data.length === 0 ? (
  <EmptyState />
) : (
  <PieChart data={data} />
)}
```
