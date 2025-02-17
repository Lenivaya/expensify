import type { Meta, StoryObj } from '@storybook/react'
import { InflowForm } from '@/components/forms/inflows/inflow-form'
import { fn } from '@storybook/test'
import { action } from '@storybook/addon-actions'

/**
 * The `InflowForm` component provides a unified interface for creating and editing inflows (income).
 * It includes fields for amount, description, and tags with comprehensive validation and error handling.
 * The form is styled with a distinctive green theme to differentiate it from expense forms.
 */
const meta = {
  title: 'Forms/Inflows/InflowForm',
  component: InflowForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A unified form component for recording and editing inflows (income) with validation and tag management.'
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
    isEditing: {
      description: 'Flag to indicate if the form is in edit mode',
      control: 'boolean'
    },
    defaultValues: {
      description: 'Initial values for the form fields',
      control: 'object'
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
} satisfies Meta<typeof InflowForm>

export default meta
type Story = StoryObj<typeof meta>

// Mock submit handler that logs the form values and triggers actions
const handleSubmit = async (values: any) => {
  action('form-submitted')(values)
  console.log('Form submitted with values:', values)
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  action('form-submission-completed')(values)
}

/**
 * Default create mode of the form with all default props
 */
export const Create: Story = {
  args: {
    onSubmit: fn(handleSubmit),
    isEditing: false
  }
}

/**
 * Edit mode with pre-filled values
 */
export const Edit: Story = {
  args: {
    onSubmit: fn(handleSubmit),
    isEditing: true,
    defaultValues: {
      amount: 2500.0,
      description: 'Monthly salary from Company XYZ',
      tags: ['salary', 'work', 'monthly']
    }
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
    title: 'Record Income',
    description:
      'Add your income details below for accurate financial tracking.'
  }
}

/**
 * Form with custom styling
 */
export const CustomStyling: Story = {
  args: {
    onSubmit: fn(handleSubmit),
    className: 'max-w-md shadow-lg bg-card/50 backdrop-blur'
  }
}

/**
 * Form demonstrating error states
 */
export const WithErrors: Story = {
  args: {
    onSubmit: fn(async (values) => {
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
    onSubmit: fn(handleSubmit),
    defaultValues: {
      amount: 5000,
      description: 'Testing max tags',
      tags: ['salary', 'bonus', 'annual', 'performance', 'work']
    }
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows how the form looks when the maximum number of tags (5) has been reached. Check the Actions panel to see tag-related events.'
      }
    }
  }
}
