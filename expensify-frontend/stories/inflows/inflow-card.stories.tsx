import type { Meta, StoryObj } from '@storybook/react'
import { InflowCard } from '@/components/inflows/inflow-card/inflow-card'

const meta = {
  title: 'Components/Inflows/InflowCard',
  component: InflowCard,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[400px] p-4">
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
  userId: 'user123',
  createdAt: new Date().toISOString()
}

export const Default: Story = {
  args: {
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

export const Interactive: Story = {
  args: {
    inflow: baseInflow,
    onEdit: (id) => alert(`Edit inflow ${id}`),
    onDelete: (id) => alert(`Delete inflow ${id}`),
    onClick: (id) => alert(`Clicked inflow ${id}`)
  }
}
