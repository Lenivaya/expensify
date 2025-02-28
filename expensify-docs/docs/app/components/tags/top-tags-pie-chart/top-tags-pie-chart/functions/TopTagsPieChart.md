# Function: TopTagsPieChart()

> **TopTagsPieChart**(`__namedParameters`): `Element`

Interactive pie chart component for displaying tag distribution

## Parameters

### \_\_namedParameters

[`TopTagsPieChartProps`](../../types/interfaces/TopTagsPieChartProps.md)

## Returns

`Element`

## Description

A comprehensive pie chart component for visualizing the distribution of tags
across transactions. Supports filtering by type, searching, and interactive
hover states.

Features:
- Interactive pie segments with hover effects
- Filterable by transaction type (all/inflow/expense)
- Searchable tags with smooth transitions
- Custom legend with detailed information
- Percentage thresholds for labels and segments
- Responsive design
- Memoized calculations for performance
- Accessible controls and information

Chart Features:
- Active segment highlighting
- Animated transitions
- Custom tooltips
- Color-coded segments
- Percentage calculations
- Minimum threshold filtering

User Interface:
- Type filter tabs with icons
- Search input with clear button
- Interactive legend
- Title and description
- Empty state handling

## Example

```tsx
<TopTagsPieChart
  tagStats={[
    { tag: "Groceries", amount: 500, type: "expense" },
    { tag: "Salary", amount: 5000, type: "inflow" }
  ]}
  showLegend={true}
  labelMinPercentage={5}
  pieMinPercentage={1}
/>
```
