import type { Meta, StoryObj } from '@storybook/react'
import { ExpenseCard } from '@/components/expenses/expense-card/expense-card'
import type { ExpenseCardData } from '@/components/expenses/expense-card/expense-card'
import { action } from '@storybook/addon-actions'

// Helper function to create sample expense data
const createSampleExpense = (
  id: string,
  amount: string,
  description: string | null,
  tags: string[],
  daysAgo = 0
): ExpenseCardData => {
  const date = new Date(Date.now() - daysAgo * 86400000).toISOString()
  return {
    id,
    amount,
    description,
    tags,
    userId: 'user123',
    createdAt: date,
    updatedAt: date
  }
}

const meta = {
  title: 'Components/Expenses/ExpenseCard',
  component: ExpenseCard,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof ExpenseCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    expense: createSampleExpense(
      '1',
      '$120.50',
      'Grocery shopping at Walmart',
      ['groceries', 'food', 'essentials'],
      0
    ),
    isAuthor: true
  }
}

export const WithoutDescription: Story = {
  args: {
    expense: createSampleExpense('2', '$45.00', null, ['entertainment'], 1),
    isAuthor: true
  }
}

export const LargeAmount: Story = {
  args: {
    expense: createSampleExpense(
      '3',
      '$1,299.99',
      'New laptop for work',
      ['electronics', 'work', 'hardware'],
      2
    ),
    isAuthor: true
  }
}

export const Loading: Story = {
  args: {
    expense: createSampleExpense(
      '4',
      '$75.00',
      'Restaurant dinner',
      ['dining', 'food'],
      0
    ),
    isLoading: true,
    isAuthor: true
  }
}

export const ReadOnly: Story = {
  args: {
    expense: createSampleExpense(
      '4',
      '$75.00',
      'Restaurant dinner',
      ['dining', 'food'],
      0
    ),
    isAuthor: false
  }
}

export const Interactive: Story = {
  args: {
    expense: createSampleExpense(
      '5',
      '$60.00',
      'Movie tickets and snacks',
      ['entertainment', 'movies'],
      0
    ),
    isAuthor: true,
    onEdit: action('onEdit'),
    onDelete: async (id: string) => {
      action('onDelete')(id)
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 1000))
      action('onDelete complete')(id)
    }
  }
}
