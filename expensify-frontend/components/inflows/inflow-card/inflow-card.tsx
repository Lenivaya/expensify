import { PrettyTag } from '@/components/generic/pretty-tag'
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
  ArrowUpFromLine,
  Calendar,
  MoreVertical,
  Pencil,
  Trash
} from 'lucide-react'
import type React from 'react'
import type { FC } from 'react'

/**
 * Data transfer object representing inflow information
 * @interface InflowCardData
 * @property {string} id - Unique identifier for the inflow
 * @property {string} amount - Pre-formatted amount from backend
 * @property {string | null} description - Optional description of the inflow
 * @property {string[]} tags - Array of tags associated with the inflow
 * @property {string} userId - UUID of the user who owns this inflow
 * @property {string | null} updatedAt - ISO timestamp of last update
 * @property {string} createdAt - ISO timestamp of creation
 */
export type InflowCardData = {
  id: string
  amount: string
  description: string | null
  tags: string[]
  userId: string
  updatedAt: string | null
  createdAt: string
}

/**
 * Props for the InflowCard component
 * @interface InflowCardProps
 * @property {InflowData} inflow - The inflow data to display
 * @property {boolean} [isLoading] - Whether the card is in a loading state
 * @property {string} [className] - Additional CSS classes to apply to the card
 * @property {(id: string) => void} [onEdit] - Callback when edit action is triggered
 * @property {(id: string) => void} [onDelete] - Callback when delete action is triggered
 * @property {(id: string) => void} [onClick] - Callback when the card is clicked
 * @property {boolean} [disabled] - Whether the card interactions are disabled
 */
export interface InflowCardProps {
  inflow: InflowCardData
  isLoading?: boolean
  className?: string
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onClick?: (id: string) => void
  disabled?: boolean
}

/**
 * InflowCard component displays inflow information in a card format
 * @component
 * @example
 * ```tsx
 * <InflowCard
 *   inflow={inflowData}
 *   onEdit={(id) => handleEdit(id)}
 *   onDelete={(id) => handleDelete(id)}
 * />
 * ```
 */
export const InflowCard: FC<InflowCardProps> = ({
  inflow,
  isLoading = false,
  className,
  onEdit,
  onDelete,
  onClick,
  disabled = false
}) => {
  // Amount is already formatted from the backend
  const formattedAmount = inflow.amount

  // Format the relative time (e.g., "2 hours ago")
  const formattedDate = formatDistanceToNow(new Date(inflow.createdAt), {
    addSuffix: true
  })

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!disabled && onEdit) {
      onEdit(inflow.id)
    }
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!disabled && onDelete) {
      onDelete(inflow.id)
    }
  }

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick(inflow.id)
    }
  }

  const exactDate = format(new Date(inflow.createdAt), 'PPP')

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
      {/* Visual indicator for inflow */}
      <div className='absolute top-0 left-0 h-full w-1 rounded-l bg-emerald-500' />

      <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-2'>
        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <ArrowUpFromLine className='h-4 w-4 text-emerald-500' />
            <p className='font-semibold text-base text-emerald-600 leading-none'>
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
                      className='h-8 w-8 p-0'
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEdit(e)
                      }}
                    >
                      <Pencil className='h-4 w-4' />
                      <span className='sr-only'>Edit inflow</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Edit inflow</TooltipContent>
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
                    className='text-destructive focus:bg-destructive/10'
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
        {inflow.description ? (
          <p className='line-clamp-2 text-sm'>{inflow.description}</p>
        ) : (
          <p className='text-muted-foreground text-sm italic'>
            No description provided
          </p>
        )}
      </CardContent>

      {inflow.tags && inflow.tags.length > 0 && (
        <CardFooter className='flex flex-wrap gap-1.5'>
          {inflow.tags.map((tag, index) => (
            <PrettyTag
              key={tag}
              label={tag}
              index={index}
              showIcon={index === 0} // Only show icon for first tag
            />
          ))}
        </CardFooter>
      )}

      {/* Focus/Active state indicator */}
      <div className='absolute inset-0 rounded-lg opacity-0 ring-2 ring-primary ring-offset-2 focus-within:opacity-100 group-focus:opacity-100' />
    </Card>
  )
}
