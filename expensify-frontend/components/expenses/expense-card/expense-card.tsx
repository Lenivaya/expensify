import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'
import { cn, Option } from '@/lib/utils'
import { format, formatDistanceToNow } from 'date-fns'
import { ArrowDownFromLine, Calendar, Pencil, Trash } from 'lucide-react'
import type React from 'react'
import { useState, useCallback, useMemo, memo } from 'react'
import { PrettyTag } from '@/components/generic/pretty-tag'

/**
 * Data transfer object representing expense information
 * @interface ExpenseCardData
 * @property {string} id - Unique identifier for the expense
 * @property {string} amount - Pre-formatted amount from backend (e.g., "-$50.00")
 * @property {string | null} description - Optional description of the expense
 * @property {string[]} tags - Array of tags associated with the expense
 * @property {Option<string>} userId - UUID of the user who owns this expense
 * @property {string | null} updatedAt - ISO timestamp of last update
 * @property {string} createdAt - ISO timestamp of creation
 */
export type ExpenseCardData = {
  id: string
  amount: string
  description: string | null
  tags: string[]
  userId: Option<string>
  updatedAt: string | null
  createdAt: string
}

/**
 * Props for the ExpenseCard component
 * @interface ExpenseCardProps
 * @property {ExpenseCardData} expense - The expense data to display
 * @property {boolean} [isLoading] - Whether the card is in a loading state
 * @property {string} [className] - Additional CSS classes to apply to the card
 * @property {boolean} [isAuthor] - Whether the current user is the author (controls edit/delete permissions)
 * @property {(id: string) => void} [onEdit] - Callback when edit action is triggered
 * @property {(id: string) => Promise<void> | void} [onDelete] - Callback when delete is confirmed
 * @property {boolean} [disabled] - Whether the card interactions are disabled
 * @property {(tag: string) => void} [onTagClick] - Callback when a tag is clicked
 */
export interface ExpenseCardProps {
  expense: ExpenseCardData
  isLoading?: boolean
  className?: string
  isAuthor?: boolean
  onEdit?: (id: string) => void
  onDelete?: (id: string) => Promise<void> | void
  disabled?: boolean
  onTagClick?: (tag: string) => void
}

// Memoized PrettyTag component to prevent unnecessary re-renders
const MemoizedPrettyTag = memo(PrettyTag)

/**
 * A card component for displaying individual expense entries
 *
 * @module ExpenseCard
 * @description
 * This component displays expense information in a card format with support for
 * various interactions like editing, deleting, and tag management. It includes
 * features for displaying monetary amounts, dates, descriptions, and tags.
 *
 * Features:
 * - Responsive card layout with hover effects
 * - Edit and delete actions for expense owners
 * - Tag display and interaction
 * - Date formatting with relative and absolute time
 * - Loading state support
 * - Accessibility features
 * - Delete confirmation dialog
 * - Memoized subcomponents for performance
 *
 * @example
 * ```tsx
 * <ExpenseCard
 *   expense={{
 *     id: '123',
 *     amount: '-$50.00',
 *     description: 'Grocery shopping',
 *     tags: ['food', 'essentials'],
 *     userId: 'user123',
 *     createdAt: '2024-02-25T12:00:00Z',
 *     updatedAt: null
 *   }}
 *   isAuthor={true}
 *   onEdit={(id) => handleEdit(id)}
 *   onDelete={(id) => handleDelete(id)}
 *   onTagClick={(tag) => handleTagFilter(tag)}
 * />
 * ```
 */
export function ExpenseCard({
  expense,
  isLoading = false,
  className,
  isAuthor = false,
  onEdit,
  onDelete,
  disabled = false,
  onTagClick
}: ExpenseCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Memoize the formatted amount to avoid recalculation on every render
  const formattedAmount = useMemo(() => {
    return expense.amount.startsWith('-')
      ? expense.amount
      : `-${expense.amount}`
  }, [expense.amount])

  // Memoize the formatted date strings to avoid expensive date calculations on every render
  const dateStrings = useMemo(() => {
    const createdDate = new Date(expense.createdAt)
    return {
      relative: formatDistanceToNow(createdDate, {
        addSuffix: true
      }),
      full: format(createdDate, 'PPP')
    }
  }, [expense.createdAt])

  // Memoize the card class to avoid recalculation on every render
  const cardClass = useMemo(() => {
    return cn(
      'group relative transition-all duration-200 hover:shadow-md',
      {
        'pointer-events-none opacity-50': isLoading || disabled
      },
      className
    )
  }, [className, isLoading, disabled])

  // Memoize event handlers to prevent recreation on every render
  const handleEdit = useCallback(() => {
    if (onEdit) {
      onEdit(expense.id)
    }
  }, [onEdit, expense.id])

  const handleDeleteClick = useCallback(() => {
    setIsDeleteDialogOpen(true)
  }, [])

  const handleDeleteConfirm = useCallback(async () => {
    if (onDelete) {
      setIsDeleting(true)
      try {
        await onDelete(expense.id)
      } finally {
        setIsDeleting(false)
        setIsDeleteDialogOpen(false)
      }
    }
  }, [onDelete, expense.id])

  const handleDialogChange = useCallback((open: boolean) => {
    setIsDeleteDialogOpen(open)
  }, [])

  // Handler for tag clicks
  const handleTagClick = useCallback(
    (tag: string) => {
      if (onTagClick && !isLoading && !disabled) {
        onTagClick(tag)
      }
    },
    [onTagClick, isLoading, disabled]
  )

  // Memoize the tags rendering to avoid recreation on every render
  const tagElements = useMemo(() => {
    if (!expense.tags || expense.tags.length === 0) return null

    return expense.tags.map((tag, index) => (
      <MemoizedPrettyTag
        key={`${expense.id}-tag-${tag}`}
        label={tag}
        index={index}
        showIcon={index === 0}
        className={cn(
          'text-xs font-medium',
          onTagClick &&
            !isLoading &&
            !disabled &&
            'cursor-pointer hover:opacity-80'
        )}
        onClick={onTagClick ? () => handleTagClick(tag) : undefined}
      />
    ))
  }, [
    expense.id,
    expense.tags,
    onTagClick,
    handleTagClick,
    isLoading,
    disabled
  ])

  return (
    <>
      <Card className={cardClass}>
        {/* Visual indicator for expense - red line with gradient */}
        <div className='absolute top-0 left-0 h-full w-1.5 rounded-l bg-gradient-to-b from-red-500 to-red-600' />

        <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-2 pt-3'>
          {/* Amount and date section */}
          <div className='min-w-0 flex-1 space-y-2'>
            <div className='flex items-center gap-2'>
              <div className='flex items-center justify-center h-6 w-6 rounded-full bg-red-100'>
                <ArrowDownFromLine className='h-3.5 w-3.5 shrink-0 text-red-600' />
              </div>
              <p className='font-bold text-lg text-red-600 leading-none tracking-tight'>
                {formattedAmount}
              </p>
            </div>
            <HoverCard>
              <HoverCardTrigger asChild>
                <button className='flex items-center gap-1.5 text-muted-foreground text-xs transition-colors hover:text-foreground max-w-full'>
                  <Calendar className='h-3 w-3 shrink-0' />
                  <span className='truncate'>{dateStrings.relative}</span>
                </button>
              </HoverCardTrigger>
              <HoverCardContent className='w-auto'>
                <div className='flex flex-col gap-1'>
                  <p className='text-sm font-medium'>Created on</p>
                  <p className='text-sm text-muted-foreground'>
                    {dateStrings.full}
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>

          {/* Action buttons */}
          {isAuthor && !disabled && !isLoading && (
            <div className='flex items-center gap-1 ml-2'>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    className='h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity'
                    onClick={handleEdit}
                  >
                    <Pencil className='h-4 w-4' />
                    <span className='sr-only'>Edit expense</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Edit expense</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    className='h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive hover:bg-destructive/10'
                    onClick={handleDeleteClick}
                  >
                    <Trash className='h-4 w-4' />
                    <span className='sr-only'>Delete expense</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete expense</TooltipContent>
              </Tooltip>
            </div>
          )}
        </CardHeader>

        <CardContent className='pb-2'>
          {expense.description ? (
            <p className='line-clamp-2 text-sm font-medium'>
              {expense.description}
            </p>
          ) : (
            <p className='text-muted-foreground text-sm italic'>
              No description provided
            </p>
          )}
        </CardContent>

        {expense.tags && expense.tags.length > 0 && (
          <CardFooter className='flex flex-wrap gap-1.5 pt-1 pb-3'>
            {tagElements}
          </CardFooter>
        )}
      </Card>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={handleDialogChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Expense</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this expense? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

/**
 * A memoized version of the ExpenseCard component for use in lists
 * @description
 * This version of the component is wrapped in React.memo to prevent unnecessary
 * re-renders when used in a list context. It should be used when the component
 * is rendered as part of a list where parent components might frequently re-render.
 *
 * @example
 * ```tsx
 * const expenseList = expenses.map(expense => (
 *   <MemoizedExpenseCard
 *     key={expense.id}
 *     expense={expense}
 *     // ... other props
 *   />
 * ))
 * ```
 */
export const MemoizedExpenseCard = memo(ExpenseCard)
