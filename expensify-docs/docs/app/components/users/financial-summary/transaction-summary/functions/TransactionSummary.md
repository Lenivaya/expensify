# Function: TransactionSummary()

> **TransactionSummary**(`__namedParameters`): `Element`

A component that displays a summary of transactions

## Parameters

### \_\_namedParameters

`TransactionSummaryProps`

## Returns

`Element`

## Description

Renders a beautiful card displaying a summary of either inflows or expenses.
Features a modern design with gradient backgrounds, icons, and hover effects.
Can be used in both standard and compact modes for flexible layouts.

Features:
- Color-coded design (green for inflows, red for expenses)
- Gradient background with hover effects
- Directional icons indicating transaction type
- Trend indicator icon
- Transaction count display
- Responsive layout
- Compact mode for space-constrained scenarios
- Interactive hover effects when clickable

Visual Elements:
- Transaction type indicator icon
- Total amount display
- Transaction count
- Trend icon
- Gradient background
- Hover animations

## Example

```tsx
// Standard usage
<TransactionSummary
  type="inflow"
  amount={5000}
  count={25}
  onClick={() => navigate('/transactions?type=inflow')}
/>

// Compact mode
<TransactionSummary
  type="expense"
  amount={3000}
  count={50}
  compact={true}
/>
```
