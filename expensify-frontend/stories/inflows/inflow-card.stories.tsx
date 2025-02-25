import type { Meta, StoryObj } from '@storybook/react'
import { InflowCard } from '@/components/inflows/inflow-card/inflow-card'
import { action } from '@storybook/addon-actions'

const meta = {
  title: 'Components/Inflows/InflowCard',
  component: InflowCard,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='w-[400px] p-4'>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof InflowCard>

export default meta
type Story = StoryObj<typeof meta>

const baseInflow = {
  id: '1',
  amount: '$1,250.75',
  description: 'Monthly salary payment from Company XYZ',
  tags: ['salary', 'monthly', 'work'],
  userId: 'current-user',
  createdAt: new Date().toISOString(),
  updatedAt: null
}

// Action handlers
const handleEdit = action('onEdit')
const handleDelete = async (id: string): Promise<void> => {
  action('onDelete')(id)
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      action('onDelete complete')(id)
      resolve()
    }, 1000)
  })
}

export const Default: Story = {
  args: {
    isAuthor: true,
    inflow: baseInflow
  }
}

export const WithoutTags: Story = {
  args: {
    inflow: {
      ...baseInflow,
      tags: []
    }
  }
}

export const LongDescription: Story = {
  args: {
    inflow: {
      ...baseInflow,
      description:
        'This is a very long description that should be truncated after two lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  }
}

export const Loading: Story = {
  args: {
    inflow: baseInflow,
    isLoading: true
  }
}

export const Disabled: Story = {
  args: {
    inflow: baseInflow,
    disabled: true
  }
}

export const ReadOnly: Story = {
  args: {
    inflow: baseInflow,
    isAuthor: false
  }
}

export const Interactive: Story = {
  args: {
    inflow: baseInflow,
    isAuthor: true,
    onEdit: handleEdit,
    onDelete: handleDelete
  }
}
