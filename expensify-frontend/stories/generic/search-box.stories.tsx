import type { Meta, StoryObj } from '@storybook/react'
import { SearchBox } from '@/components/generic/password-strength-checker/search-box/search-box'

const meta = {
  title: 'Components/Generic/SearchBox',
  component: SearchBox,
  tags: ['autodocs'],
  args: {
    placeholder: 'Search...',
    debounceMs: 300,
    showClear: true,
    iconSize: 18,
    disabled: false,
    enableHotkey: false
  },
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof SearchBox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSearch: (value) => console.log('Searching for:', value)
  }
}

export const WithCustomPlaceholder: Story = {
  args: {
    placeholder: 'Search transactions...',
    onSearch: (value) => console.log('Searching for:', value)
  }
}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'Initial search term',
    onSearch: (value) => console.log('Searching for:', value)
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'Cannot search',
    onSearch: (value) => console.log('Searching for:', value)
  }
}

export const CustomStyling: Story = {
  args: {
    className: 'max-w-sm bg-muted p-2 rounded-xl',
    inputClassName: 'bg-background',
    onSearch: (value) => console.log('Searching for:', value)
  }
}

export const WithHotkey: Story = {
  args: {
    placeholder: 'Press ⌃K to focus',
    enableHotkey: true,
    className: 'max-w-sm',
    onSearch: (value) => console.log('Searching for:', value)
  }
}

export const WithCustomHotkey: Story = {
  args: {
    placeholder: 'Press ⇧/ to focus',
    enableHotkey: true,
    hotkey: 'ctrl+/',
    className: 'max-w-sm',
    onSearch: (value) => console.log('Searching for:', value)
  }
}
