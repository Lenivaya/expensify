# Function: FinancialSummaryCard()

> **FinancialSummaryCard**(`__namedParameters`): `Element`

A comprehensive financial summary card component

## Parameters

### \_\_namedParameters

[`FinancialStatisticsCardProps`](../interfaces/FinancialStatisticsCardProps.md)

## Returns

`Element`

## Description

Renders a beautiful and interactive card that provides a complete overview
of a user's financial status. The component includes current balance,
transaction summaries, and detailed statistics with a collapsible section.

Features:
- Current balance display with hover breakdown
- Inflow and expense summaries with transaction counts
- Expense to income ratio visualization
- Collapsible statistics section
- Interactive sections with click handlers
- Tooltips for additional information
- Responsive design with dark mode support
- Beautiful gradients and hover effects

Visual Elements:
- Balance card with hover details
- Progress bar for expense ratio
- Transaction summary cards
- Statistics section with toggle
- Info tooltips
- Icons and indicators

States:
- Collapsible statistics (showStats)
- Loading states for data
- Interactive hover states
- Color-coded indicators based on ratios

## Example

```tsx
<FinancialSummaryCard
  data={{
    currentBalance: {
      totalInflows: 5000,
      totalExpenses: 3000,
      balance: 2000
    },
    statistics: {
      averageInflow: 1000,
      averageExpense: 600,
      averageMonthlyInflow: 2500,
      averageMonthlyExpense: 1500,
      totalInflowCount: 25,
      totalExpenseCount: 50
    }
  }}
  onInflowClick={() => navigate('/inflows')}
  onExpenseClick={() => navigate('/expenses')}
  onBalanceClick={() => navigate('/balance')}
/>
```
