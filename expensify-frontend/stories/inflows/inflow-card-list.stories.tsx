import { InflowCardList } from '@/components/inflows/inflow-card-list'
import type { InflowCardData } from '@/components/inflows/inflow-card/inflow-card'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/Inflows/InflowCardList',
  component: InflowCardList,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs']
} satisfies Meta<typeof InflowCardList>

export default meta
type Story = StoryObj<typeof meta>

// Helper function to create sample inflow data
const createSampleInflow = (
  id: string,
  amount: string,
  description: string,
  tags: string[],
  daysAgo = 0
): InflowCardData => {
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

const sampleInflows: InflowCardData[] = [
  createSampleInflow(
    '1',
    '$1,250.75',
    'Monthly salary payment',
    ['salary', 'monthly'],
    0
  ),
  createSampleInflow(
    '2',
    '$500.00',
    'Freelance project payment',
    ['freelance'],
    1
  ),
  createSampleInflow(
    '3',
    '$50.00',
    'Gift from friend',
    ['gift'],
    2
  )
]

export const GridLayout: Story = {
  args: {
    inflows: sampleInflows,
    defaultLayout: 'grid',
    showLayoutToggle: true,
    showSortOptions: true
  }
}

export const FeedLayout: Story = {
  args: {
    inflows: sampleInflows,
    defaultLayout: 'feed',
    showLayoutToggle: true,
    showSortOptions: true
  }
}

export const CompactLayout: Story = {
  args: {
    inflows: sampleInflows,
    defaultLayout: 'compact',
    showLayoutToggle: false,
    showSortOptions: true
  }
}

export const WithCustomHeader: Story = {
  args: {
    inflows: sampleInflows,
    header: (
      <h2 className="text-xl font-semibold">
        Recent Inflows
      </h2>
    ),
    footer: (
      <p className="text-sm text-muted-foreground">
        Showing all inflows
      </p>
    )
  }
}

export const Loading: Story = {
  args: {
    inflows: sampleInflows,
    isLoading: true
  }
}
