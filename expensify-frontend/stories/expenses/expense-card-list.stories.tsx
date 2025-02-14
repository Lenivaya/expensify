import type { Meta, StoryObj } from '@storybook/react'
import { ExpenseCardList } from '@/components/expenses/expense-card-list/expense-card-list'
import type { ExpenseCardData } from '@/components/expenses/expense-card/expense-card'

/**
 * Helper function to create sample expense data
 */
const createSampleExpense = (
  id: string,
  amount: string,
  description: string | null,
  tags: string[],
  daysAgo = 0
): ExpenseCardData => {
  const date = new Date(
    Date.now() - daysAgo * 86400000
  ).toISOString()
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

// Sample expense data
const sampleExpenses: ExpenseCardData[] = [
  createSampleExpense(
    '1',
    '$120.50',
    'Grocery shopping at Walmart',
    ['groceries', 'food', 'essentials'],
    0
  ),
  createSampleExpense(
    '2',
    '$45.00',
    'Movie tickets',
    ['entertainment', 'movies'],
    1
  ),
  createSampleExpense(
    '3',
    '$1,299.99',
    'New laptop for work',
    ['electronics', 'work', 'hardware'],
    2
  ),
  createSampleExpense(
    '4',
    '$60.00',
    'Restaurant dinner',
    ['dining', 'food'],
    3
  ),
  createSampleExpense(
    '5',
    '$25.00',
    null,
    ['miscellaneous'],
    4
  )
]

const meta = {
  title: 'Components/Expenses/ExpenseCardList',
  component: ExpenseCardList,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs']
} satisfies Meta<typeof ExpenseCardList>

export default meta
type Story = StoryObj<typeof meta>

export const GridLayout: Story = {
  args: {
    expenses: sampleExpenses,
    defaultLayout: 'grid',
    showLayoutToggle: true,
    showSortOptions: true
  }
}

export const FeedLayout: Story = {
  args: {
    expenses: sampleExpenses,
    defaultLayout: 'feed',
    showLayoutToggle: true,
    showSortOptions: true
  }
}

export const CompactLayout: Story = {
  args: {
    expenses: sampleExpenses,
    defaultLayout: 'compact',
    showLayoutToggle: false,
    showSortOptions: true
  }
}

export const WithCustomHeader: Story = {
  args: {
    expenses: sampleExpenses,
    header: (
      <h2 className="text-xl font-semibold">
        Recent Expenses
      </h2>
    ),
    footer: (
      <p className="text-sm text-muted-foreground">
        Showing all expenses
      </p>
    )
  }
}

export const Loading: Story = {
  args: {
    expenses: [],
    isLoading: true,
    defaultLayout: 'grid',
    showLayoutToggle: true,
    showSortOptions: true
  }
}

export const LoadingFeed: Story = {
  args: {
    expenses: [],
    isLoading: true,
    defaultLayout: 'feed',
    showLayoutToggle: true,
    showSortOptions: true
  }
}

export const LoadingCompact: Story = {
  args: {
    expenses: [],
    isLoading: true,
    defaultLayout: 'compact',
    showLayoutToggle: false,
    showSortOptions: true
  }
}

export const Interactive: Story = {
  args: {
    expenses: sampleExpenses,
    defaultLayout: 'grid',
    showLayoutToggle: true,
    showSortOptions: true,
    onEdit: (id) => alert(`Edit expense ${id}`),
    onDelete: (id) => alert(`Delete expense ${id}`),
    onExpenseClick: (id) =>
      alert(`Navigate to expense ${id}`)
  }
}
