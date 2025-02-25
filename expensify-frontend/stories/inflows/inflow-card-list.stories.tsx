import { InflowCardList } from '@/components/inflows/inflow-card-list'
import type { InflowCardData } from '@/components/inflows/inflow-card/inflow-card'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/Inflows/InflowCardList',
  component: InflowCardList,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='w-full max-w-[1400px] mx-auto'>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof InflowCardList>

export default meta
type Story = StoryObj<typeof meta>

// Helper function to create sample inflow data
const createSampleInflow = (
  id: string,
  amount: string,
  description: string,
  tags: string[],
  daysAgo = 0,
  isAuthor = false
): InflowCardData => {
  const date = new Date(Date.now() - daysAgo * 86400000).toISOString()
  return {
    id,
    amount,
    description,
    tags,
    userId: isAuthor ? 'current-user' : 'other-user',
    createdAt: date,
    updatedAt: null
  }
}

const sampleInflows: InflowCardData[] = [
  createSampleInflow(
    '1',
    '$1,250.75',
    'Monthly salary payment',
    ['salary', 'monthly'],
    0,
    true // Current user is author
  ),
  createSampleInflow(
    '2',
    '$500.00',
    'Freelance project payment',
    ['freelance'],
    1,
    false // Other user is author
  ),
  createSampleInflow(
    '3',
    '$50.00',
    'Gift from friend',
    ['gift'],
    2,
    true // Current user is author
  )
]

const handleEdit = (id: string) => {
  console.log('Edit inflow:', id)
  alert(`Edit inflow ${id}`)
}

const handleDelete = (id: string) =>
  new Promise<void>((resolve) => {
    console.log('Delete inflow:', id)
    setTimeout(() => {
      alert(`Delete inflow ${id}`)
      resolve()
    }, 1000)
  })

export const GridLayout: Story = {
  args: {
    inflows: sampleInflows,
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
    inflows: sampleInflows,
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
    inflows: sampleInflows,
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
    inflows: sampleInflows,
    header: <h2 className='font-semibold text-xl'>Recent Inflows</h2>,
    footer: (
      <p className='text-muted-foreground text-sm'>Showing all inflows</p>
    ),
    currentUserId: 'current-user',
    onEdit: handleEdit,
    onDelete: handleDelete
  }
}

export const Loading: Story = {
  args: {
    inflows: sampleInflows,
    isLoading: true,
    currentUserId: 'current-user'
  }
}

export const ReadOnly: Story = {
  args: {
    inflows: sampleInflows,
    currentUserId: 'other-user'
  }
}

// Add a story to demonstrate mixed permissions
export const MixedAuthorship: Story = {
  args: {
    inflows: [
      // User can edit and delete this one
      createSampleInflow(
        '1',
        '$1,250.75',
        'Monthly salary payment',
        ['salary', 'monthly'],
        0,
        true // is author
      ),
      // User cannot edit or delete this one
      createSampleInflow(
        '2',
        '$500.00',
        'Freelance project payment',
        ['freelance'],
        1,
        false // not author
      ),
      // User can edit and delete this one
      createSampleInflow('3', '$50.00', 'Gift from friend', ['gift'], 2, true)
    ],
    currentUserId: 'current-user',
    onEdit: handleEdit,
    onDelete: handleDelete
  }
}
