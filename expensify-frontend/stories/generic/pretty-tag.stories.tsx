import type { Meta, StoryObj } from '@storybook/react'
import { PrettyTag } from '@/components/generic/pretty-tag'

const meta = {
  title: 'Components/Generic/PrettyTag',
  component: PrettyTag,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The text content of the tag'
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to show the tag icon'
    },
    index: {
      control: 'number',
      description: 'Optional index for deterministic color selection'
    },
    onClick: {
      action: 'clicked',
      description: 'Optional click handler'
    }
  }
} satisfies Meta<typeof PrettyTag>

export default meta
type Story = StoryObj<typeof meta>

// Basic tag
export const Default: Story = {
  args: {
    label: 'Example Tag'
  }
}

// Tag with icon
export const WithIcon: Story = {
  args: {
    label: 'Tag with Icon',
    showIcon: true
  }
}

// Interactive tag
export const Interactive: Story = {
  args: {
    label: 'Click me',
    showIcon: true,
    onClick: (label) => console.log(`Clicked: ${label}`)
  }
}

// Tag with specific color (using index)
export const SpecificColor: Story = {
  args: {
    label: 'Colored Tag',
    index: 5 // Will always use the 6th color in the palette
  }
}

// Multiple tags showcase
export const TagGroup: Story = {
  args: {
    label: 'groceries' // Required by type system
  },
  render: (args) => (
    <div className='flex flex-wrap gap-2'>
      {[
        'groceries',
        'entertainment',
        'travel',
        'food',
        'shopping',
        'utilities',
        'transport',
        'health'
      ].map((tag, index) => (
        <PrettyTag key={tag} label={tag} index={index} showIcon={index === 0} />
      ))}
    </div>
  )
}

// Long text tag
export const LongText: Story = {
  args: {
    label: 'This is a very long tag text that should be handled gracefully'
  }
}

// Tag with all features
export const FullFeatured: Story = {
  args: {
    label: 'Full Featured',
    showIcon: true,
    index: 2,
    onClick: (label) => console.log(`Clicked: ${label}`)
  }
}

// Different sizes in context
export const InContext: Story = {
  args: {
    label: 'Context Example' // Required by type system
  },
  render: (args) => (
    <div className='space-y-4'>
      <div className='flex flex-wrap gap-2'>
        <PrettyTag label='Small tag' />
        <PrettyTag label='Medium sized tag' />
        <PrettyTag
          label='Interactive tag'
          onClick={(label) => console.log(`Clicked: ${label}`)}
        />
      </div>
      <div className='flex flex-wrap gap-2'>
        <PrettyTag label='With icon' showIcon />
        <PrettyTag label='Specific color' index={3} showIcon />
        <PrettyTag
          label='Both'
          showIcon
          onClick={(label) => console.log(`Clicked: ${label}`)}
        />
      </div>
    </div>
  )
}

// Color showcase
export const ColorPalette: Story = {
  args: {
    label: 'Color Palette Example' // Required by type system
  },
  render: (args) => (
    <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
      {Array.from({ length: 16 }, (_, i) => (
        <div key={i} className='flex flex-col items-center gap-2'>
          <PrettyTag label={`Color ${i + 1}`} index={i} showIcon />
          <span className='text-xs text-muted-foreground'>Index: {i}</span>
        </div>
      ))}
    </div>
  )
}
