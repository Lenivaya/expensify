# Function: CustomTooltip()

> **CustomTooltip**(`props`): `ReactNode`

A custom tooltip component for the pie chart

## Parameters

### props

`CustomTooltipProps`

## Returns

`ReactNode`

## Description

This component renders a styled tooltip for the pie chart segments.
It displays the segment name and formatted monetary value with a
modern glassmorphism design.

Features:
- Glassmorphism design with backdrop blur
- Formatted currency display
- Responsive layout
- Memoized for performance
- Null rendering when inactive

Visual Elements:
- Segment name in semibold
- Currency value in muted color
- Rounded corners with border
- Blurred background
- Drop shadow

## Example

```tsx
<CustomTooltip
  active={true}
  payload={[{
    payload: {
      name: "Groceries",
      value: 123.45,
      color: "#3B82F6"
    }
  }]}
/>
```
