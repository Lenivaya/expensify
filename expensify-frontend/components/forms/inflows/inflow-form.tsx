const MAX_TAGS = 5
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
  Wallet,
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

const SUGGESTED_TAGS = [
  'salary',
  'freelance',
  'investment',
  'bonus',
  'gift',
  'refund',
  'other'
]

export const inflowSchema = z.object({
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

export type InflowFormValues = z.infer<typeof inflowSchema>

export interface InflowFormProps {
  /**
   * Callback function that handles form submission
   * @param values The validated form values
   * @returns A promise that resolves when the submission is complete
   */
  onSubmit: (values: InflowFormValues) => Promise<void>
  /**
   * Optional initial values for the form
   */
  defaultValues?: Partial<InflowFormValues>
  /**
   * Optional flag to indicate if this is an edit form
   * @default false
   */
  isEditing?: boolean
  /**
   * Optional flag to disable the form while submission is in progress
   */
  isSubmitting?: boolean
  /**
   * Optional className for styling the form container
   */
  className?: string
  /**
   * Optional title for the form card
   * If not provided, will use default based on isEditing
   */
  title?: string
  /**
   * Optional description for the form
   * If not provided, will use default based on isEditing
   */
  description?: string
}

export function InflowForm({
  onSubmit,
  defaultValues,
  isEditing = false,
  isSubmitting = false,
  className,
  title,
  description
}: InflowFormProps) {
  const [suggestedTags, setSuggestedTags] = useState<string[]>(
    defaultValues?.tags
      ? SUGGESTED_TAGS.filter((tag) => !defaultValues.tags?.includes(tag))
      : SUGGESTED_TAGS
  )
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [formattedAmount, setFormattedAmount] = useState(
    defaultValues?.amount?.toFixed(2) || '0.00'
  )

  const form = useForm<InflowFormValues>({
    resolver: zodResolver(inflowSchema),
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

  const handleSubmit = async (values: InflowFormValues) => {
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
      field: { value: string[]; onChange: (value: string[]) => void }
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
      field: { value: string[]; onChange: (value: string[]) => void }
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
      field: { value: string[]; onChange: (value: string[]) => void }
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
  const defaultTitle = isEditing ? 'Edit Inflow' : 'Record New Inflow'
  const defaultDescription = isEditing
    ? 'Update the inflow details below'
    : 'Record a new income or money received with amount, description, and optional tags.'
  const buttonText = isEditing ? 'Update Inflow' : 'Record Inflow'
  const loadingText = isEditing ? 'Updating...' : 'Recording...'

  return (
    <Card className={cn('w-full max-w-md mx-auto', className)}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='space-y-6'
          aria-label={isEditing ? 'Edit inflow form' : 'Create inflow form'}
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
                      <span className='absolute left-3 top-2.5 text-foreground font-medium select-none'>
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
                          'focus-visible:ring-emerald-500',
                          '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        )}
                        disabled={isSubmitting}
                        aria-describedby='amount-description'
                      />
                    </div>
                  </FormControl>
                  <FormDescription id='amount-description'>
                    Enter the amount received in dollars
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
                      placeholder='e.g., Monthly salary from Company XYZ'
                      {...field}
                      className='text-base'
                      disabled={isSubmitting}
                      aria-describedby='description-help'
                    />
                  </FormControl>
                  <FormDescription id='description-help'>
                    Brief description of where this money came from
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
                              'bg-emerald-100/50 hover:bg-emerald-100 text-emerald-900',
                              'dark:bg-emerald-900/20 dark:hover:bg-emerald-900/30 dark:text-emerald-100',
                              !isSubmitting && 'cursor-pointer'
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
                          className={cn(
                            'pl-9',
                            'focus-visible:ring-emerald-500'
                          )}
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
                                className={cn(
                                  'px-3 py-1.5 cursor-pointer',
                                  'border-emerald-200 text-emerald-700',
                                  'hover:bg-emerald-100 hover:text-emerald-900 hover:border-emerald-300',
                                  'dark:border-emerald-800 dark:text-emerald-200',
                                  'dark:hover:bg-emerald-900/30 dark:hover:text-emerald-50 dark:hover:border-emerald-700',
                                  'transition-colors'
                                )}
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
                    Add up to {MAX_TAGS} tags to categorize your inflow
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
              className={cn(
                'w-full py-6 text-lg',
                'bg-emerald-600 hover:bg-emerald-700',
                'dark:bg-emerald-600 dark:hover:bg-emerald-700'
              )}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                  {loadingText}
                </>
              ) : (
                <>
                  <Wallet className='mr-2 h-5 w-5' />
                  {buttonText}
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
