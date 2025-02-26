/**
 * Maximum number of tags allowed per expense
 */
const MAX_TAGS = 5

/**
 * Maximum length of a single tag in characters
 */
const MAX_TAG_LENGTH = 20

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  X,
  Tag as TagIcon,
  Loader2,
  Receipt,
  DollarSign,
  FileText,
  Plus,
  PencilLine
} from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useCallback, useState, useEffect } from 'react'
import { Separator } from '@/components/ui/separator'

/**
 * List of predefined tags that are suggested to users when adding tags to an expense
 */
const SUGGESTED_TAGS = [
  'groceries',
  'utilities',
  'entertainment',
  'transport',
  'food',
  'shopping',
  'health',
  'bills'
]

/**
 * Schema for validating expense form data
 * @remarks
 * - Amount must be between 0.01 and 1,000,000
 * - Description must be between 3 and 100 characters
 * - Tags are optional but must follow specific format rules if provided
 */
export const expenseSchema = z.object({
  amount: z
    .number()
    .min(0.01, 'Amount must be greater than 0')
    .max(1000000, 'Amount seems too large. Please verify.'),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters')
    .max(100, 'Description must be less than 100 characters'),
  tags: z
    .array(
      z
        .string()
        .min(2, 'Tag must be at least 2 characters')
        .max(
          MAX_TAG_LENGTH,
          `Tag must be less than ${MAX_TAG_LENGTH} characters`
        )
        .regex(
          /^[a-zA-Z0-9-]+$/,
          'Tags can only contain letters, numbers, and hyphens'
        )
    )
    .max(MAX_TAGS, `You can add up to ${MAX_TAGS} tags`)
    .default([])
})

/**
 * Type representing the validated form values from the expense schema
 * @see expenseSchema for validation rules
 */
export type ExpenseFormValues = z.infer<typeof expenseSchema>

/**
 * Props for the ExpenseForm component
 * @interface
 */
export interface ExpenseFormProps {
  /**
   * Callback function that handles form submission
   * @param values The validated form values
   * @returns A promise that resolves when the submission is complete
   */
  onSubmit: (values: ExpenseFormValues) => Promise<void>

  /**
   * Optional initial values for the form fields
   * @remarks
   * - If provided, the form will be pre-filled with these values
   * - Useful for edit mode where you want to show existing expense data
   */
  defaultValues?: Partial<ExpenseFormValues>

  /**
   * Flag indicating if the form is in edit mode
   * @remarks
   * Changes the form's behavior and UI elements to reflect editing an existing expense
   * @default false
   */
  isEditing?: boolean

  /**
   * Flag indicating if the form is currently submitting
   * @remarks
   * When true, disables form inputs and shows loading state
   * @default false
   */
  isSubmitting?: boolean

  /**
   * Optional CSS class name for styling the form container
   */
  className?: string

  /**
   * Optional custom title for the form
   * @remarks
   * If not provided, defaults to "Create New Expense" or "Edit Expense" based on isEditing
   */
  title?: string

  /**
   * Optional custom description for the form
   * @remarks
   * If not provided, defaults to a context-appropriate description based on isEditing
   */
  description?: string
}

/**
 * A form component for creating and editing expenses
 *
 * @description
 * This component provides a form interface for users to input or modify expense details.
 * It includes fields for amount, description, and tags with real-time validation and formatting.
 *
 * Features:
 * - Real-time amount formatting with currency display
 * - Tag management with suggestions and validation
 * - Support for both create and edit modes
 * - Accessible form controls with ARIA labels
 * - Responsive design with mobile-friendly inputs
 *
 * @example
 * ```tsx
 * // Create mode
 * <ExpenseForm
 *   onSubmit={handleSubmit}
 *   isSubmitting={isLoading}
 * />
 *
 * // Edit mode
 * <ExpenseForm
 *   onSubmit={handleUpdate}
 *   defaultValues={existingExpense}
 *   isEditing={true}
 *   isSubmitting={isUpdating}
 * />
 * ```
 */
export function ExpenseForm({
  onSubmit,
  defaultValues,
  isEditing = false,
  isSubmitting = false,
  className,
  title,
  description
}: ExpenseFormProps) {
  const [suggestedTags, setSuggestedTags] = useState<string[]>(
    defaultValues?.tags
      ? SUGGESTED_TAGS.filter((tag) => !defaultValues.tags?.includes(tag))
      : SUGGESTED_TAGS
  )
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [formattedAmount, setFormattedAmount] = useState(
    defaultValues?.amount?.toFixed(2) || '0.00'
  )

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      amount: defaultValues?.amount || 0,
      description: defaultValues?.description || '',
      tags: defaultValues?.tags || []
    }
  })

  // Format amount when it changes
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '')

    if (value === '') {
      setFormattedAmount('0.00')
      form.setValue('amount', 0)
      return
    }

    // Convert to number and handle decimals
    let numValue = parseFloat(value)
    if (isNaN(numValue)) numValue = 0

    // Format with exactly 2 decimal places
    const formatted = numValue.toFixed(2)
    setFormattedAmount(formatted)
    form.setValue('amount', numValue)
  }

  // Update formatted amount when form value changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'amount') {
        setFormattedAmount(value.amount?.toFixed(2) || '0.00')
      }
    })
    return () => subscription.unsubscribe()
  }, [form.watch])

  const handleSubmit = async (values: ExpenseFormValues) => {
    try {
      await onSubmit(values)
      if (!isEditing) {
        form.reset()
        setShowSuggestions(false)
      }
    } catch (error) {
      console.error('Form submission failed:', error)
    }
  }

  const handleKeyDown = useCallback(
    (
      event: React.KeyboardEvent<HTMLInputElement>,
      field: {
        value: string[]
        onChange: (value: string[]) => void
      }
    ) => {
      const input = event.currentTarget
      const value = input.value.trim().toLowerCase()

      if (event.key === 'Enter' && value) {
        event.preventDefault()

        if (!/^[a-zA-Z0-9-]+$/.test(value)) {
          form.setError('tags', {
            type: 'manual',
            message: 'Tags can only contain letters, numbers, and hyphens'
          })
          return
        }

        if (value.length > MAX_TAG_LENGTH) {
          form.setError('tags', {
            type: 'manual',
            message: `Tag must be less than ${MAX_TAG_LENGTH} characters`
          })
          return
        }

        if (field.value.length >= MAX_TAGS) {
          form.setError('tags', {
            type: 'manual',
            message: `You can add up to ${MAX_TAGS} tags`
          })
          return
        }

        if (!field.value.includes(value)) {
          field.onChange([...field.value, value])
          form.clearErrors('tags')

          // Update suggested tags
          setSuggestedTags((prev) => prev.filter((tag) => tag !== value))
        }

        input.value = ''
        setShowSuggestions(false)
      }

      if (event.key === 'Backspace' && !input.value && field.value.length > 0) {
        event.preventDefault()
        const newTags = [...field.value]
        const removedTag = newTags.pop()
        field.onChange(newTags)
        form.clearErrors('tags')

        // Add removed tag back to suggestions if it was a suggested tag
        if (removedTag && SUGGESTED_TAGS.includes(removedTag)) {
          setSuggestedTags((prev) => [...prev, removedTag])
        }
      }

      // Show suggestions when user starts typing
      if (input.value && !showSuggestions) {
        setShowSuggestions(true)
      }
    },
    [form, showSuggestions]
  )

  const removeTag = useCallback(
    (
      tagToRemove: string,
      field: {
        value: string[]
        onChange: (value: string[]) => void
      }
    ) => {
      const newTags = field.value.filter((tag) => tag !== tagToRemove)
      field.onChange(newTags)
      form.clearErrors('tags')

      // Add removed tag back to suggestions if it was a suggested tag
      if (SUGGESTED_TAGS.includes(tagToRemove)) {
        setSuggestedTags((prev) => [...prev, tagToRemove])
      }
    },
    [form]
  )

  const addSuggestedTag = useCallback(
    (
      tag: string,
      field: {
        value: string[]
        onChange: (value: string[]) => void
      }
    ) => {
      if (field.value.length >= MAX_TAGS) {
        form.setError('tags', {
          type: 'manual',
          message: `You can add up to ${MAX_TAGS} tags`
        })
        return
      }

      if (!field.value.includes(tag)) {
        field.onChange([...field.value, tag])
        setSuggestedTags((prev) => prev.filter((t) => t !== tag))
        form.clearErrors('tags')
      }
    },
    [form]
  )

  // Default texts based on mode
  const defaultTitle = isEditing ? 'Edit Expense' : 'Create New Expense'
  const defaultDescription = isEditing
    ? 'Update the expense details below'
    : 'Record a new expense with amount, description, and optional tags.'
  const buttonText = isEditing ? 'Update Expense' : 'Create Expense'
  const loadingText = isEditing ? 'Updating...' : 'Creating...'

  return (
    <Card className={cn('w-full max-w-md mx-auto', className)}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='space-y-6'
          aria-label={isEditing ? 'Edit expense form' : 'Create expense form'}
        >
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              {isEditing ? (
                <PencilLine className='w-5 h-5' />
              ) : (
                <Plus className='w-5 h-5' />
              )}
              {title || defaultTitle}
            </CardTitle>
            <CardDescription>
              {description || defaultDescription}
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-6'>
            <FormField
              control={form.control}
              name='amount'
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel className='flex items-center gap-2'>
                    <DollarSign className='w-4 h-4' />
                    Amount
                  </FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <span className='absolute left-3 top-1.5 text-foreground font-medium select-none'>
                        $
                      </span>
                      <Input
                        {...field}
                        type='text'
                        inputMode='decimal'
                        pattern='[0-9]*\.?[0-9]*'
                        placeholder='0.00'
                        value={formattedAmount}
                        onChange={handleAmountChange}
                        className={cn(
                          'pl-7 text-lg font-medium text-right pr-4',
                          'focus-visible:ring-2 focus-visible:ring-offset-2',
                          '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        )}
                        disabled={isSubmitting}
                        aria-describedby='amount-description'
                      />
                    </div>
                  </FormControl>
                  <FormDescription id='amount-description'>
                    Enter the expense amount in dollars
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex items-center gap-2'>
                    <FileText className='w-4 h-4' />
                    Description
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='e.g., Grocery shopping at Walmart'
                      {...field}
                      className='text-base'
                      disabled={isSubmitting}
                      aria-describedby='description-help'
                    />
                  </FormControl>
                  <FormDescription id='description-help'>
                    Brief description of what this expense was for
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='tags'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex items-center gap-2'>
                    <TagIcon className='w-4 h-4' />
                    Tags
                  </FormLabel>
                  <FormControl>
                    <div className='space-y-3'>
                      <div className='flex flex-wrap gap-2 min-h-[2.5rem]'>
                        {field.value.map((tag, index) => (
                          <Badge
                            key={`${tag}-${index}`}
                            variant='secondary'
                            className={cn(
                              'px-3 py-1.5 text-sm animate-in fade-in-0 zoom-in-95',
                              !isSubmitting &&
                                'hover:bg-secondary/80 cursor-pointer'
                            )}
                          >
                            <TagIcon className='w-3 h-3 mr-1 opacity-70' />
                            {tag}
                            {!isSubmitting && (
                              <button
                                type='button'
                                onClick={() => removeTag(tag, field)}
                                className='ml-1 hover:text-destructive focus:text-destructive focus:outline-none'
                                aria-label={`Remove ${tag} tag`}
                              >
                                <X className='h-3 w-3' />
                              </button>
                            )}
                          </Badge>
                        ))}
                      </div>

                      <div className='relative'>
                        <TagIcon className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
                        <Input
                          placeholder={
                            field.value.length >= MAX_TAGS
                              ? `Maximum ${MAX_TAGS} tags reached`
                              : 'Add a tag and press Enter'
                          }
                          onKeyDown={(e) => handleKeyDown(e, field)}
                          onFocus={() => setShowSuggestions(true)}
                          disabled={
                            isSubmitting || field.value.length >= MAX_TAGS
                          }
                          className='pl-9'
                          type='text'
                          aria-describedby='tags-help'
                        />
                      </div>

                      {showSuggestions && suggestedTags.length > 0 && (
                        <div className='mt-2'>
                          <p className='text-sm text-muted-foreground mb-2'>
                            Suggested tags:
                          </p>
                          <div className='flex flex-wrap gap-2'>
                            {suggestedTags.map((tag) => (
                              <Badge
                                key={tag}
                                variant='outline'
                                className='px-3 py-1.5 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors'
                                onClick={() => addSuggestedTag(tag, field)}
                              >
                                <TagIcon className='w-3 h-3 mr-1 opacity-70' />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription id='tags-help'>
                    Add up to {MAX_TAGS} tags to categorize your expense
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <Separator />

          <CardFooter>
            <Button
              type='submit'
              disabled={isSubmitting}
              className='w-full py-6 text-lg'
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                  {loadingText}
                </>
              ) : (
                buttonText
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
