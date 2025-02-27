import { FinancialSummaryCard } from '@/components/users/financial-summary/financial-summary'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/Users/FinancialSummaryCard',
  component: FinancialSummaryCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A component that displays comprehensive financial information including current balance, inflows, expenses, and related statistics. Supports both light and dark modes, and includes interactive elements.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    onInflowClick: {
      description: 'Callback fired when the inflow section is clicked',
      control: false
    },
    onExpenseClick: {
      description: 'Callback fired when the expense section is clicked',
      control: false
    },
    onBalanceClick: {
      description: 'Callback fired when the balance section is clicked',
      control: false
    },
    className: {
      description: 'Additional CSS classes to apply to the component',
      control: 'text'
    },
    data: {
      description: 'Financial data to display in the component',
      control: 'object'
    }
  },
  decorators: [
    (Story) => (
      <div style={{ width: '700px' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof FinancialSummaryCard>

export default meta
type Story = StoryObj<typeof meta>

const defaultData = {
  currentBalance: {
    totalInflows: 5000.0,
    totalExpenses: 3000.0,
    balance: 2000.0
  },
  statistics: {
    averageInflow: 1000.0,
    averageExpense: 800.0,
    averageMonthlyInflow: 4000.0,
    averageMonthlyExpense: 3200.0,
    totalInflowCount: 25,
    totalExpenseCount: 50
  }
}

export const Default: Story = {
  args: {
    data: defaultData
  }
}

export const WithInteractions: Story = {
  args: {
    data: defaultData,
    onInflowClick: () => alert('Inflow section clicked'),
    onExpenseClick: () => alert('Expense section clicked'),
    onBalanceClick: () => alert('Balance section clicked')
  },
  parameters: {
    docs: {
      description: {
        story:
          'Example with all interactive elements enabled. Click on the balance, inflow, or expense sections to trigger the callbacks.'
      }
    }
  }
}

export const CustomStyling: Story = {
  args: {
    data: defaultData,
    className: 'max-w-xl shadow-xl'
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with custom styling applied through className prop.'
      }
    }
  }
}

export const HighBalance: Story = {
  args: {
    data: {
      currentBalance: {
        totalInflows: 150000.0,
        totalExpenses: 50000.0,
        balance: 100000.0
      },
      statistics: {
        averageInflow: 15000.0,
        averageExpense: 5000.0,
        averageMonthlyInflow: 60000.0,
        averageMonthlyExpense: 20000.0,
        totalInflowCount: 10,
        totalExpenseCount: 20
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story:
          'Example with larger monetary values to demonstrate number formatting.'
      }
    }
  }
}

export const NegativeBalance: Story = {
  args: {
    data: {
      currentBalance: {
        totalInflows: 3000.0,
        totalExpenses: 5000.0,
        balance: -2000.0
      },
      statistics: {
        averageInflow: 750.0,
        averageExpense: 1250.0,
        averageMonthlyInflow: 3000.0,
        averageMonthlyExpense: 5000.0,
        totalInflowCount: 4,
        totalExpenseCount: 8
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing how negative balances are displayed.'
      }
    }
  }
}
