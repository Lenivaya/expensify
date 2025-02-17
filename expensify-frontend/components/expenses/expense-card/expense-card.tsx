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
import { cn } from '@/lib/utils'
import { format, formatDistanceToNow } from 'date-fns'
import { ArrowDownFromLine, Calendar, Pencil, Trash } from 'lucide-react'
import type React from 'react'
import { useState } from 'react'
import { PrettyTag } from '@/components/generic/pretty-tag'

/**
 * Data transfer object representing expense information
 * @interface ExpenseCardData
 * @property {string} id - Unique identifier for the expense
 * @property {string} amount - Pre-formatted amount from backend
 * @property {string | null} description - Optional description of the expense
 * @property {string[]} tags - Array of tags associated with the expense
 * @property {string} userId - UUID of the user who owns this expense
 * @property {string | null} updatedAt - ISO timestamp of last update
 * @property {string} createdAt - ISO timestamp of creation
 */
export type ExpenseCardData = {
  id: string
  amount: string
  description: string | null
  tags: string[]
  userId: string
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
 */
export interface ExpenseCardProps {
  expense: ExpenseCardData
  isLoading?: boolean
  className?: string
  isAuthor?: boolean
  onEdit?: (id: string) => void
  onDelete?: (id: string) => Promise<void> | void
  disabled?: boolean
}

export function ExpenseCard({
  expense,
  isLoading = false,
  className,
  isAuthor = false,
  onEdit,
  onDelete,
  disabled = false
}: ExpenseCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Amount is already formatted from backend, but we want to ensure it's negative
  const formattedAmount = expense.amount.startsWith('-')
    ? expense.amount
    : `-${expense.amount}`

  const handleEdit = () => {
    if (onEdit) {
      onEdit(expense.id)
    }
  }

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (onDelete) {
      setIsDeleting(true)
      try {
        await onDelete(expense.id)
      } finally {
        setIsDeleting(false)
        setIsDeleteDialogOpen(false)
      }
    }
  }

  return (
    <>
      <Card
        className={cn(
          'group relative transition-all duration-200',
          {
            'pointer-events-none opacity-50': isLoading || disabled
          },
          className
        )}
      >
        {/* Visual indicator for expense - red line */}
        <div className='absolute top-0 left-0 h-full w-1 rounded-l bg-red-500' />

        <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-2'>
          {/* Amount and date section */}
          <div className='min-w-0 flex-1 space-y-1'>
            <div className='flex items-center gap-2'>
              <ArrowDownFromLine className='h-4 w-4 shrink-0 text-red-500' />
              <p className='font-semibold text-base text-red-600 leading-none truncate'>
                {formattedAmount}
              </p>
            </div>
            <HoverCard>
              <HoverCardTrigger asChild>
                <button className='flex items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground max-w-full'>
                  <Calendar className='h-3.5 w-3.5 shrink-0' />
                  <span className='truncate'>
                    {formatDistanceToNow(new Date(expense.createdAt), {
                      addSuffix: true
                    })}
                  </span>
                </button>
              </HoverCardTrigger>
              <HoverCardContent className='w-auto'>
                <div className='flex flex-col gap-1'>
                  <p className='text-sm font-medium'>Created on</p>
                  <p className='text-sm text-muted-foreground'>
                    {format(new Date(expense.createdAt), 'PPP')}
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>

          {/* Action buttons */}
          {isAuthor && !disabled && !isLoading && (
            <div className='flex items-center gap-2 ml-4'>
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
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className='h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive'
                onClick={handleDeleteClick}
              >
                <Trash className='h-4 w-4' />
                <span className='sr-only'>Delete expense</span>
              </Button>
            </div>
          )}
        </CardHeader>

        <CardContent>
          {expense.description ? (
            <p className='line-clamp-2 text-sm'>{expense.description}</p>
          ) : (
            <p className='text-muted-foreground text-sm italic'>
              No description provided
            </p>
          )}
        </CardContent>

        {expense.tags && expense.tags.length > 0 && (
          <CardFooter className='flex flex-wrap gap-1.5'>
            {expense.tags.map((tag, index) => (
              <PrettyTag
                key={tag}
                label={tag}
                index={index}
                showIcon={index === 0}
              />
            ))}
          </CardFooter>
        )}
      </Card>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
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
