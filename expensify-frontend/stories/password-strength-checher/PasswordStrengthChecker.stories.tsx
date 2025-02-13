import PasswordStrengthChecker from '@/components/generic/password-strength-checker/PasswordStrenghChecker'
import type { PasswordStrength } from '@/components/generic/password-strength-checker/types'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof PasswordStrengthChecker> = {
  title:
    'UI/PasswordStrengthChecker/PasswordStrengthChecker',
  component: PasswordStrengthChecker,
  parameters: {
    layout: 'centered',
    backgrounds: {}
  },
  tags: ['autodocs'],
  argTypes: {
    onPasswordChange: { action: 'passwordChanged' },
    onSubmit: { action: 'submitted' }
  }
}

export default meta

type Story = StoryObj<typeof PasswordStrengthChecker>

export const Default: Story = {
  args: {
    placeholder: 'Enter your password',
    onSubmit: (
      password: string,
      strength: PasswordStrength
    ) =>
      console.log('Password submitted:', password, strength)
  }
}

export const WithInitialPassword: Story = {
  args: {
    initialPassword: 'initialPassword123',
    placeholder: 'Enter your password',
    onSubmit: (
      password: string,
      strength: PasswordStrength
    ) =>
      console.log('Password submitted:', password, strength)
  }
}
