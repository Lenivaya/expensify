import { PasswordStrengthIndicator } from '@/components/generic/password-strength-checker/PasswordStrengthIndicator'
import type { Meta, StoryObj } from '@storybook/react'
import { themes } from '@storybook/theming'

const meta: Meta<typeof PasswordStrengthIndicator> = {
  title: 'Components/Generic/PasswordStrengthChecker/PasswordStrengthIndicator',
  component: PasswordStrengthIndicator,
  parameters: {
    layout: 'centered',
    darkMode: {
      current: 'light',
      stylePreview: true,
      dark: { ...themes.dark },
      light: { ...themes.light }
    },
    backgrounds: {
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0f172a' }
      ]
    },
    docs: {
      description: {
        component:
          'A customizable password strength indicator component that provides visual feedback about password strength.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    strength: {
      description: 'The current strength level of the password',
      control: 'select',
      options: ['veryWeak', 'weak', 'moderate', 'strong', 'veryStrong'],
      table: {
        type: { summary: 'PasswordStrength' },
        defaultValue: { summary: 'veryWeak' }
      }
    },
    strengthMap: {
      description: 'Custom mapping for strength levels appearance',
      control: 'object',
      table: {
        type: { summary: 'Partial<StrengthMapType>' }
      }
    },
    styleConfig: {
      description: 'Custom styling configuration',
      control: 'object',
      table: {
        type: { summary: 'StyleConfig' }
      }
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
      table: {
        type: { summary: 'string' }
      }
    }
  },
  decorators: [
    (Story) => (
      <div className='flex min-h-[200px] items-center justify-center p-8'>
        <div className='w-[600px] rounded-lg bg-background p-6 shadow-lg'>
          <Story />
        </div>
      </div>
    )
  ]
}

export default meta

type Story = StoryObj<typeof PasswordStrengthIndicator>

export const VeryWeak: Story = {
  args: {
    strength: 'veryWeak'
  }
}

export const Weak: Story = {
  args: {
    strength: 'weak'
  }
}

export const Moderate: Story = {
  args: {
    strength: 'moderate'
  }
}

export const Strong: Story = {
  args: {
    strength: 'strong'
  }
}

export const VeryStrong: Story = {
  args: {
    strength: 'veryStrong'
  }
}

export const CustomStyles: Story = {
  name: 'Custom styles',
  args: {
    strength: 'strong',
    styleConfig: {
      containerClassName: 'space-y-4',
      labelClassName: 'text-sm font-medium'
    }
  }
}

export const CustsomStrengthMap: Story = {
  name: 'Custom StrengthMap',
  args: {
    strength: 'strong',
    strengthMap: {
      strong: {
        label: 'Excellent!',
        percentage: 90
      }
    }
  }
}
