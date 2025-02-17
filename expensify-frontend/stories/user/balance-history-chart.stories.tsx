import type { Meta, StoryObj } from '@storybook/react'
import { BalanceHistoryChart } from '@/components/users/balance-history-chart/balance-history-chart'

const meta = {
  title: 'User/BalanceHistoryChart',
  component: BalanceHistoryChart,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark'
    }
  },
  argTypes: {
    balanceHistory: {
      description: 'Array of balance history data points',
      control: 'object'
    },
    height: {
      description: 'Height of the chart container in pixels',
      control: { type: 'number', min: 200, max: 800, step: 50 }
    },
    defaultTimeRange: {
      description: 'Initial time range to display',
      control: 'select',
      options: ['1M', '3M', '6M', '1Y', 'ALL']
    },
    showTimeRangeSelector: {
      description: 'Show/hide the time range selector',
      control: 'boolean'
    },
    showZoomControls: {
      description: 'Show/hide the zoom controls',
      control: 'boolean'
    }
  },
  decorators: [
    (Story) => (
      <div
        className='dark bg-background p-4'
        style={{ width: '1000px', minHeight: '600px' }}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof BalanceHistoryChart>

export default meta
type Story = StoryObj<typeof meta>

// Generate realistic sample data for the last 24 months
const generateSampleData = () => {
  const data = []
  const now = new Date()
  let cumulativeBalance = 1000 // Starting balance

  // Base values for more realistic data
  const baseInflow = 5000
  const baseExpense = 4000
  const volatility = 0.3 // 30% volatility

  for (let i = 24; i >= 0; i--) {
    const date = new Date(now)
    date.setMonth(now.getMonth() - i)

    // Generate more realistic variations
    const inflowMultiplier = 1 + (Math.random() - 0.5) * volatility
    const expenseMultiplier = 1 + (Math.random() - 0.5) * volatility

    const inflow = baseInflow * inflowMultiplier
    const expense = baseExpense * expenseMultiplier
    const balance = inflow - expense
    cumulativeBalance += balance

    data.push({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      inflow: inflow.toFixed(2),
      expense: expense.toFixed(2),
      balance: balance.toFixed(2),
      cumulativeBalance: cumulativeBalance.toFixed(2)
    })
  }

  return data
}

export const Default: Story = {
  args: {
    balanceHistory: generateSampleData(),
    height: 400,
    defaultTimeRange: 'ALL',
    showTimeRangeSelector: true,
    showZoomControls: true
  }
}

export const Tall: Story = {
  args: {
    ...Default.args,
    height: 600
  }
}

export const NoControls: Story = {
  args: {
    ...Default.args,
    showTimeRangeSelector: false,
    showZoomControls: false
  }
}

export const YearlyView: Story = {
  args: {
    ...Default.args,
    defaultTimeRange: '1Y'
  }
}

export const Empty: Story = {
  args: {
    ...Default.args,
    balanceHistory: []
  }
}

export const SingleMonth: Story = {
  args: {
    ...Default.args,
    balanceHistory: generateSampleData().slice(0, 1)
  }
}

// Add a description for the component in the docs
Default.parameters = {
  docs: {
    description: {
      component: `
The BalanceHistoryChart component visualizes financial data over time with interactive features.
It displays three key metrics:
- Inflow (income/revenue)
- Expense (costs/outgoing)
- Balance (net difference)

### Features
- Interactive area chart with smooth animations
- Time range selection (1M, 3M, 6M, 1Y, ALL)
- Zoom controls for detailed data exploration
- Responsive design
- Custom tooltips with detailed information
- Dark mode compatible
- Accessible

### Usage
\`\`\`tsx
import { BalanceHistoryChart } from '@/components/users/balance-history-chart/balance-history-cahrt'

export function FinancialDashboard() {
  return (
    <BalanceHistoryChart
      balanceHistory={data}
      height={400}
      defaultTimeRange="3M"
    />
  )
}
\`\`\`
      `
    }
  }
}
