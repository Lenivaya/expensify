import type { Meta, StoryObj } from '@storybook/react'
import { CreateExpenseForm } from '@/components/forms/expenses/create-expense.form'
import { fn } from '@storybook/test'
import { action } from '@storybook/addon-actions'

type ExpenseFormValues = {
  amount: number
  description: string
  tags: string[]
}

/**
 * The `CreateExpenseForm` component provides a user-friendly interface for creating new expenses.
 * It includes fields for amount, description, and tags with comprehensive validation and error handling.
 */
const meta = {
  title: 'Forms/Expenses/CreateExpenseForm',
  component: CreateExpenseForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A form component for creating new expenses with validation and tag management.'
      }
    },
    actions: {
      handles: ['onSubmit']
    }
  },
  tags: ['autodocs'],
  argTypes: {
    onSubmit: {
      description: 'Callback function called when the form is submitted',
      action: 'form submitted'
    },
    isSubmitting: {
      description: 'Flag to indicate if the form is currently submitting',
      control: 'boolean'
    },
    title: {
      description: 'Title of the form card',
      control: 'text'
    },
    description: {
      description: 'Description text shown below the title',
      control: 'text'
    },
    className: {
      description: 'Additional CSS classes to apply to the form container',
      control: 'text'
    }
  }
} satisfies Meta<typeof CreateExpenseForm>

export default meta
type Story = StoryObj<typeof meta>

// Mock submit handler that logs the form values and triggers actions
const handleSubmit = async (values: ExpenseFormValues) => {
  action('form-submitted')(values)
  console.log('Form submitted with values:', values)
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  action('form-submission-completed')(values)
}

/**
 * Default state of the form with all default props
 */
export const Default: Story = {
  args: {
    onSubmit: fn(handleSubmit)
  }
}

/**
 * Form in submitting state with loading indicators
 */
export const Submitting: Story = {
  args: {
    onSubmit: fn(handleSubmit),
    isSubmitting: true
  }
}

/**
 * Form with custom title and description
 */
export const CustomTitleAndDescription: Story = {
  args: {
    onSubmit: fn(handleSubmit),
    title: 'Record Expense',
    description:
      'Add your expense details below to keep track of your spending.'
  }
}

/**
 * Form with pre-filled values for testing
 */
export const PrefilledForm: Story = {
  args: {
    onSubmit: fn(async (values: ExpenseFormValues) => {
      action('edit-form-submitted')(values)
      console.log('Edited form submitted with values:', values)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      action('edit-form-completed')(values)
    }),
    title: 'Edit Expense'
  }
}

/**
 * Form with custom styling
 */
export const CustomStyling: Story = {
  args: {
    onSubmit: fn(handleSubmit),
    className: 'max-w-md shadow-lg'
  }
}

/**
 * Form demonstrating error states
 */
export const WithErrors: Story = {
  args: {
    onSubmit: fn(async (values: ExpenseFormValues) => {
      action('form-submission-failed')(values)
      console.log('Form submission failed with values:', values)
      throw new Error('Simulated API error')
    })
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates how the form handles submission errors. Check the Actions panel to see the error events.'
      }
    }
  }
}

/**
 * Form with maximum tags added
 */
export const WithMaxTags: Story = {
  args: {
    onSubmit: fn(async (values: ExpenseFormValues) => {
      action('max-tags-form-submitted')(values)
      await handleSubmit(values)
    }),
    title: 'Form with Maximum Tags'
  },
  decorators: [
    (Story) => {
      return (
        <div className='w-full max-w-md'>
          <Story />
        </div>
      )
    }
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Shows how the form looks when the maximum number of tags (5) has been reached. Check the Actions panel to see tag-related events.'
      }
    }
  }
}
