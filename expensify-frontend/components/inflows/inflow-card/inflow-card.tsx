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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'
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
import { useState } from 'react'

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
 * @property {boolean} [isAuthor] - Whether the current user is the author (controls edit/delete permissions)
 * @property {(id: string) => void} [onEdit] - Callback when edit action is triggered
 * @property {(id: string) => Promise<void> | void} [onDelete] - Callback when delete is confirmed
 * @property {boolean} [disabled] - Whether the card interactions are disabled
 */
export interface InflowCardProps {
  inflow: InflowCardData
  isLoading?: boolean
  className?: string
  isAuthor?: boolean
  onEdit?: (id: string) => void
  onDelete?: (id: string) => Promise<void> | void
  disabled?: boolean
}

/**
 * InflowCard component displays inflow information in a card format with edit and delete capabilities
 * @component
 * @example
 * ```tsx
 * <InflowCard
 *   inflow={inflowData}
 *   isAuthor={isAuthor}
 *   onEdit={(id) => handleEdit(id)}
 *   onDelete={(id) => handleDelete(id)}
 * />
 * ```
 */
export const InflowCard: FC<InflowCardProps> = ({
  inflow,
  isLoading = false,
  className,
  isAuthor = false,
  onEdit,
  onDelete,
  disabled = false
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isAmountTruncated, setIsAmountTruncated] = useState(false)

  const handleEdit = () => {
    if (onEdit) {
      onEdit(inflow.id)
    }
  }

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (onDelete) {
      setIsDeleting(true)
      try {
        await onDelete(inflow.id)
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
        {/* Visual indicator for inflow */}
        <div className='absolute top-0 left-0 h-full w-1 rounded-l bg-emerald-500' />

        <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-2'>
          {/* Amount and date section */}
          <div className='min-w-0 flex-1 space-y-1'>
            <div className='flex items-center gap-2'>
              <ArrowUpFromLine className='h-4 w-4 shrink-0 text-emerald-500' />
              <p className='font-semibold text-base text-emerald-600 leading-none truncate'>
                {inflow.amount}
              </p>
            </div>
            <HoverCard>
              <HoverCardTrigger asChild>
                <button className='flex items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground max-w-full'>
                  <Calendar className='h-3.5 w-3.5 shrink-0' />
                  <span className='truncate'>
                    {formatDistanceToNow(new Date(inflow.createdAt), {
                      addSuffix: true
                    })}
                  </span>
                </button>
              </HoverCardTrigger>
              <HoverCardContent className='w-auto'>
                <div className='flex flex-col gap-1'>
                  <p className='text-sm font-medium'>Created on</p>
                  <p className='text-sm text-muted-foreground'>
                    {format(new Date(inflow.createdAt), 'PPP')}
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
                <span className='sr-only'>Edit inflow</span>
              </Button>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className='h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive'
                onClick={handleDeleteClick}
              >
                <Trash className='h-4 w-4' />
                <span className='sr-only'>Delete inflow</span>
              </Button>
            </div>
          )}
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
            <AlertDialogTitle>Delete Inflow</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this inflow? This action cannot be
              undone.
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
