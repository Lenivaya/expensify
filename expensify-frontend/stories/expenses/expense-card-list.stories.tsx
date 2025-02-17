import type { Meta, StoryObj } from '@storybook/react'
import { ExpenseCardList } from '@/components/expenses/expense-card-list/expense-card-list'
import type { ExpenseCardData } from '@/components/expenses/expense-card/expense-card'
import { action } from '@storybook/addon-actions'

/**
 * Helper function to create sample expense data
 */
const createSampleExpense = (
  id: string,
  amount: string,
  description: string | null,
  tags: string[],
  daysAgo = 0,
  isAuthor = false
): ExpenseCardData => {
  const date = new Date(Date.now() - daysAgo * 86400000).toISOString()
  return {
    id,
    amount,
    description,
    tags,
    userId: isAuthor ? 'current-user' : 'other-user',
    createdAt: date,
    updatedAt: date
  }
}

// Sample expense data with mixed authorship
const sampleExpenses: ExpenseCardData[] = [
  createSampleExpense(
    '1',
    '$120.50',
    'Grocery shopping at Walmart',
    ['groceries', 'food', 'essentials'],
    0,
    true // Current user is author
  ),
  createSampleExpense(
    '2',
    '$45.00',
    'Movie tickets',
    ['entertainment', 'movies'],
    1,
    false // Other user is author
  ),
  createSampleExpense(
    '3',
    '$1,299.99',
    'New laptop for work',
    ['electronics', 'work', 'hardware'],
    2,
    true // Current user is author
  ),
  createSampleExpense(
    '4',
    '$60.00',
    'Restaurant dinner',
    ['dining', 'food'],
    3,
    true // Current user is author
  ),
  createSampleExpense(
    '5',
    '$25.00',
    null,
    ['miscellaneous'],
    4,
    false // Other user is author
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

// Action handlers
const handleEdit = action('onEdit')
const handleDelete = async (id: string) => {
  action('onDelete')(id)
  // Simulate async operation
  await new Promise((resolve) => setTimeout(resolve, 1000))
  action('onDelete complete')(id)
}

export const GridLayout: Story = {
  args: {
    expenses: sampleExpenses,
    defaultLayout: 'grid',
    showLayoutToggle: true,
    showSortOptions: true,
    currentUserId: 'current-user',
    onEdit: handleEdit,
    onDelete: handleDelete
  }
}

export const FeedLayout: Story = {
  args: {
    expenses: sampleExpenses,
    defaultLayout: 'feed',
    showLayoutToggle: true,
    showSortOptions: true,
    currentUserId: 'current-user',
    onEdit: handleEdit,
    onDelete: handleDelete
  }
}

export const CompactLayout: Story = {
  args: {
    expenses: sampleExpenses,
    defaultLayout: 'compact',
    showLayoutToggle: false,
    showSortOptions: true,
    currentUserId: 'current-user',
    onEdit: handleEdit,
    onDelete: handleDelete
  }
}

export const WithCustomHeader: Story = {
  args: {
    expenses: sampleExpenses,
    header: <h2 className='font-semibold text-xl'>Recent Expenses</h2>,
    footer: (
      <p className='text-muted-foreground text-sm'>Showing all expenses</p>
    ),
    currentUserId: 'current-user',
    onEdit: handleEdit,
    onDelete: handleDelete
  }
}

export const Loading: Story = {
  args: {
    expenses: sampleExpenses,
    isLoading: true,
    defaultLayout: 'grid',
    showLayoutToggle: true,
    showSortOptions: true,
    currentUserId: 'current-user'
  }
}

export const ReadOnly: Story = {
  args: {
    expenses: sampleExpenses,
    defaultLayout: 'grid',
    showLayoutToggle: true,
    showSortOptions: true,
    currentUserId: 'other-user'
  }
}

export const MixedAuthorship: Story = {
  args: {
    expenses: sampleExpenses,
    defaultLayout: 'grid',
    showLayoutToggle: true,
    showSortOptions: true,
    currentUserId: 'current-user',
    onEdit: handleEdit,
    onDelete: handleDelete
  }
}
