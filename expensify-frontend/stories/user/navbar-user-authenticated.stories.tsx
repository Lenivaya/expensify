import type { Meta, StoryObj } from '@storybook/react'
import { NavbarUserAuthenticated } from '@/components/layout/navbar/navbar-user/navbar-user-authenticated'

const meta = {
  title: 'Components/Navbar/User/Authenticated',
  component: NavbarUserAuthenticated,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='mx-auto w-full max-w-screen-xl bg-background p-4'>
        <div className='flex justify-end'>
          <Story />
        </div>
      </div>
    )
  ]
} satisfies Meta<typeof NavbarUserAuthenticated>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    user: {
      id: '1',
      username: 'johndor',
      email: 'john.doe@example.com'
    }
  }
}

export const WithLongName: Story = {
  args: {
    user: {
      id: '2',
      username: 'williamshakespeare',
      email: 'john.constantine@example.com'
    }
  }
}

export const OnlyUsername: Story = {
  args: {
    user: {
      id: '3',
      username: 'Jane Doe',
      email: 'jane.doe@example.com'
    }
  }
}

export const WithCustomLogoutHandler: Story = {
  args: {
    user: {
      id: '4',
      username: 'bobsmith',
      email: 'bob.smith@example.com'
    },
    handleLogout: () => alert('Custom logout handler called!')
  }
}
