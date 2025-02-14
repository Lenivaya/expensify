import type { Meta, StoryObj } from '@storybook/react'
import { EmptyPlaceholder } from '@/components/ui/empty-placeholder'
import { FileQuestion, Receipt, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

const meta = {
  title: 'Components/UI/EmptyPlaceholder',
  component: EmptyPlaceholder,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof EmptyPlaceholder>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Icon name={FileQuestion} />
      <EmptyPlaceholder.Title>
        No content yet
      </EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        You don&apos;t have any content yet. Start creating
        some!
      </EmptyPlaceholder.Description>
    </EmptyPlaceholder>
  )
}

export const WithButton: Story = {
  render: () => (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Icon name={Receipt} />
      <EmptyPlaceholder.Title>
        No expenses
      </EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        You haven&apos;t recorded any expenses yet. Create
        your first expense to start tracking.
      </EmptyPlaceholder.Description>
      <Button>Add Expense</Button>
    </EmptyPlaceholder>
  )
}

export const SearchResults: Story = {
  render: () => (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Icon name={Search} />
      <EmptyPlaceholder.Title>
        No results found
      </EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        We couldn&apos;t find any expenses matching your
        search. Try adjusting your filters or search terms.
      </EmptyPlaceholder.Description>
    </EmptyPlaceholder>
  )
}
