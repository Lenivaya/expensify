# Function: BalanceHistoryChart()

> **BalanceHistoryChart**(`__namedParameters`): `Element`

A comprehensive balance history chart component

## Parameters

### \_\_namedParameters

`BalanceHistoryChartProps`

## Returns

`Element`

## Description

Renders a beautiful and interactive area chart that visualizes financial
balance history over time. The chart shows inflows, expenses, and net
balance with customizable time ranges and interactive features.

Features:
- Interactive area chart with smooth animations
- Multiple time range options (1M, 3M, 6M, 1Y, ALL)
- Toggleable data series (balance, inflows, expenses)
- Responsive design with window resize handling
- Custom tooltips with detailed information
- Beautiful gradient fills
- Dark mode support
- Trend indicators

Visual Elements:
- Area chart with gradient fills
- Time range selector
- Interactive legend
- Tooltips
- Grid lines
- Axis labels

Interactions:
- Hover over data points for details
- Click legend items to toggle series
- Select time range
- Responsive to window resizing

## Example

```tsx
<BalanceHistoryChart
  balanceHistory={[
    {
      year: 2024,
      month: 3,
      inflow: "1500.00",
      expense: "1200.00",
      balance: "300.00",
      cumulativeBalance: "2500.00"
    },
    // ... more data points
  ]}
  height={500}
  defaultTimeRange="6M"
  showLegend={true}
  title="Financial History"
  description="Your balance trends over time"
/>
```
