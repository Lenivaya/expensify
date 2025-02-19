import { TopTagsPieChart } from '@/components/tags/top-tags-pie-chart/top-tags-pie-chart'
import type { TagSummaryItemDto } from '@/components/tags/top-tags-pie-chart/types'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/Tags/TopTagsPieChart',
  component: TopTagsPieChart,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    height: {
      control: { type: 'number' },
      description: 'Height of the chart in pixels'
    },
    defaultView: {
      control: { type: 'select' },
      options: ['all', 'inflow', 'expense'],
      description: 'Default selected view type'
    },
    showLegend: {
      control: 'boolean',
      description: 'Whether to show the legend'
    },
    title: {
      control: 'text',
      description: 'Title of the chart'
    },
    description: {
      control: 'text',
      description: 'Description text below the title'
    },
    showLabels: {
      control: 'boolean',
      description: 'Whether to show labels on pie segments'
    },
    labelMinPercentage: {
      control: {
        type: 'number',
        min: 0,
        max: 100,
        step: 1
      },
      description: 'Minimum percentage for a segment to show its label'
    }
  },
  decorators: [
    (Story) => (
      <div style={{ width: '700px' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof TopTagsPieChart>

export default meta
type Story = StoryObj<typeof TopTagsPieChart>

// Sample data for stories
const sampleData: TagSummaryItemDto[] = [
  {
    tag: 'Groceries',
    amount: '$500.00',
    type: 'expense'
  },
  {
    tag: 'Salary',
    amount: '$5000.00',
    type: 'inflow'
  },
  {
    tag: 'Rent',
    amount: '$1200.00',
    type: 'expense'
  },
  {
    tag: 'Freelance',
    amount: '$2000.00',
    type: 'inflow'
  },
  {
    tag: 'Utilities',
    amount: '$150.00',
    type: 'expense'
  },
  {
    tag: 'Investments',
    amount: '$1000.00',
    type: 'inflow'
  },
  {
    tag: 'Entertainment',
    amount: '$200.00',
    type: 'expense'
  },
  {
    tag: 'Bonus',
    amount: '$3000.00',
    type: 'inflow'
  }
]

export const Default: Story = {
  args: {
    tagStats: sampleData,
    height: 400,
    defaultView: 'all'
  }
}

export const ExpensesOnly: Story = {
  args: {
    tagStats: sampleData.filter((item) => item.type === 'expense'),
    height: 400,
    defaultView: 'expense'
  }
}

export const InflowsOnly: Story = {
  args: {
    tagStats: sampleData.filter((item) => item.type === 'inflow'),
    height: 400,
    defaultView: 'inflow'
  }
}

export const CustomHeight: Story = {
  args: {
    tagStats: sampleData,
    height: 600,
    defaultView: 'all'
  }
}

export const Empty: Story = {
  args: {
    tagStats: [],
    height: 400,
    defaultView: 'all'
  }
}

export const SingleItem: Story = {
  args: {
    tagStats: [sampleData[0]],
    height: 400,
    defaultView: 'all'
  }
}

export const SmallHeight: Story = {
  args: {
    tagStats: sampleData,
    height: 200,
    defaultView: 'all'
  }
}

export const WithLabels: Story = {
  args: {
    tagStats: sampleData,
    height: 400,
    showLabels: true,
    labelMinPercentage: 5
  }
}

export const WithoutLegend: Story = {
  args: {
    tagStats: sampleData,
    height: 400,
    defaultView: 'all',
    showLegend: false
  }
}

export const WithCustomClass: Story = {
  args: {
    tagStats: sampleData,
    height: 400,
    className: 'bg-slate-700',
    defaultView: 'all'
  }
}
