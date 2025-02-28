# Function: BalanceSection()

> **BalanceSection**(`__namedParameters`): `Element`

A component that displays the current balance with detailed breakdown

## Parameters

### \_\_namedParameters

`BalanceSectionProps`

## Returns

`Element`

## Description

Renders a beautiful card displaying the current balance with a hover card
showing the breakdown of total inflows and expenses. The component features
a modern glassmorphism design with gradient backgrounds and hover effects.

Features:
- Gradient background with glassmorphism effect
- Hover card with delayed opening (200ms)
- Responsive layout
- Interactive hover effects when clickable
- Color-coded currency displays
- Detailed balance breakdown on hover
- Smooth animations and transitions

Visual Elements:
- Current balance display
- Total inflows (positive transactions)
- Total expenses (negative transactions)
- Color indicators for positive/negative amounts
- Gradient backgrounds and borders

## Example

```tsx
<BalanceSection
  balance={{
    totalInflows: 5000,
    totalExpenses: 3000,
    balance: 2000
  }}
  onClick={() => navigate('/detailed-balance')}
/>
```
