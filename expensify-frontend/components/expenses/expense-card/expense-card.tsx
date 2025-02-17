import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { format, formatDistanceToNow } from 'date-fns'
import {
  ArrowDownFromLine,
  Calendar,
  MoreVertical,
  Pencil,
  Trash
} from 'lucide-react'
import type React from 'react'
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
 * @property {(id: string) => void} [onEdit] - Callback when edit action is triggered
 * @property {(id: string) => void} [onDelete] - Callback when delete action is triggered
 * @property {(id: string) => void} [onClick] - Callback when the card is clicked
 * @property {boolean} [disabled] - Whether the card interactions are disabled
 */
export interface ExpenseCardProps {
  expense: ExpenseCardData
  isLoading?: boolean
  className?: string
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onClick?: (id: string) => void
  disabled?: boolean
}

export function ExpenseCard({
  expense,
  isLoading = false,
  className,
  onEdit,
  onDelete,
  onClick,
  disabled = false
}: ExpenseCardProps) {
  // Format date to relative time (e.g., "2 hours ago")
  const formattedDate = formatDistanceToNow(new Date(expense.createdAt), {
    addSuffix: true
  })

  // Format exact date for tooltip
  const exactDate = format(new Date(expense.createdAt), 'PPP')

  // Amount is already formatted from backend, but we want to ensure it's negative
  const formattedAmount = expense.amount.startsWith('-')
    ? expense.amount
    : `-${expense.amount}`

  const handleClick =
    onClick && !disabled ? () => onClick(expense.id) : undefined
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    onEdit?.(expense.id)
  }
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete?.(expense.id)
  }

  return (
    <Card
      className={cn(
        'group relative transition-all duration-200 hover:border-primary/20',
        {
          'pointer-events-none opacity-50': isLoading || disabled,
          'cursor-pointer hover:shadow-md': !disabled && onClick
        },
        className
      )}
      onClick={handleClick}
    >
      {/* Visual indicator for expense - red line */}
      <div className='absolute top-0 left-0 h-full w-1 rounded-l bg-red-500' />

      <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-2'>
        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <ArrowDownFromLine className='h-4 w-4 text-red-500' />
            <p className='font-semibold text-base text-red-600 leading-none'>
              {formattedAmount}
            </p>
          </div>
          <Tooltip>
            <TooltipTrigger className='flex items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground'>
              <Calendar className='h-3.5 w-3.5' />
              {formattedDate}
            </TooltipTrigger>
            <TooltipContent>
              <p>Created on {exactDate}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className='flex items-center gap-2'>
          {/* Quick action buttons that appear on hover */}
          {(onEdit || onDelete) && (
            <div className='opacity-0 transition-opacity group-hover:opacity-100'>
              {onEdit && (
                <Tooltip>
                  <TooltipTrigger asChild={true}>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='h-8 w-8 p-0 hover:text-red-600'
                      onClick={handleEdit}
                    >
                      <Pencil className='h-4 w-4' />
                      <span className='sr-only'>Edit expense</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Edit expense</TooltipContent>
                </Tooltip>
              )}
            </div>
          )}

          {/* More actions dropdown */}
          {(onEdit || onDelete) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild={true}>
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-8 w-8 p-0'
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className='sr-only'>Open menu</span>
                  <MoreVertical className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                {onEdit && (
                  <DropdownMenuItem onClick={handleEdit}>
                    <Pencil className='mr-2 h-4 w-4' />
                    Edit
                  </DropdownMenuItem>
                )}
                {onEdit && onDelete && <DropdownMenuSeparator />}
                {onDelete && (
                  <DropdownMenuItem
                    className='text-red-600 focus:bg-red-50'
                    onClick={handleDelete}
                  >
                    <Trash className='mr-2 h-4 w-4' />
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
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
          {expense.tags.map((tag) => (
            <PrettyTag key={tag} label={tag} />
          ))}
        </CardFooter>
      )}

      {/* Focus/Active state indicator */}
      <div className='absolute inset-0 rounded-lg opacity-0 ring-2 ring-red-500 ring-offset-2 focus-within:opacity-100 group-focus:opacity-100' />
    </Card>
  )
}
