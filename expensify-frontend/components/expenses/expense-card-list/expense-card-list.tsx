import type { ExpenseCardData } from '../expense-card/expense-card'
import { ExpenseCard } from '../expense-card/expense-card'
import { cn, Option } from '@/lib/utils'
import { Grid, List, X } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useState, useMemo, useCallback, memo } from 'react'
import type React from 'react'
import { Badge } from '@/components/ui/badge'

/**
 * Layout options for the expense card list
 */
export type ExpenseCardLayout = 'grid' | 'feed' | 'compact'

/**
 * Sort options for expense cards
 */
export type ExpenseSortOption =
  | 'date-desc'
  | 'date-asc'
  | 'amount-desc'
  | 'amount-asc'

/**
 * Props for the ExpenseCardList component
 */
export interface ExpenseCardListProps {
  expenses: ExpenseCardData[]
  isLoading?: boolean
  className?: string
  defaultLayout?: ExpenseCardLayout
  showLayoutToggle?: boolean
  showSortOptions?: boolean
  currentUserId?: Option<string>
  onEdit?: (id: string) => void
  onDelete?: (id: string) => Promise<void> | void
  header?: React.ReactNode
  footer?: React.ReactNode
  selectedTags?: string[]
  onTagSelect?: (tag: string) => void
  onTagRemove?: (tag: string) => void
}

// Memoized ExpenseCard component to prevent unnecessary re-renders
const MemoizedExpenseCard = memo(ExpenseCard)

/**
 * ExpenseCardList component for displaying a list of expense cards in various layouts
 */
export const ExpenseCardList: React.FC<ExpenseCardListProps> = ({
  expenses,
  isLoading = false,
  className,
  defaultLayout = 'grid',
  showLayoutToggle = true,
  showSortOptions = true,
  currentUserId,
  onEdit,
  onDelete,
  header,
  footer,
  selectedTags = [],
  onTagSelect,
  onTagRemove
}) => {
  // State for layout and sort options
  const [layout, setLayout] = useState<ExpenseCardLayout>(defaultLayout)
  const [sortOption, setSortOption] = useState<ExpenseSortOption>('date-desc')

  // Memoize the layout change handlers to prevent recreation on each render
  const handleGridLayout = useCallback(() => setLayout('grid'), [])
  const handleFeedLayout = useCallback(() => setLayout('feed'), [])

  // Memoize the sort option change handler
  const handleSortChange = useCallback((value: string) => {
    setSortOption(value as ExpenseSortOption)
  }, [])

  // Handler for tag clicks
  const handleTagClick = useCallback(
    (tag: string) => {
      if (onTagSelect) {
        onTagSelect(tag)
      }
    },
    [onTagSelect]
  )

  // Handler for removing a selected tag
  const handleTagRemove = useCallback(
    (tag: string) => {
      if (onTagRemove) {
        onTagRemove(tag)
      }
    },
    [onTagRemove]
  )

  // Memoize sorted expenses to avoid expensive sorting on every render
  const sortedExpenses = useMemo(() => {
    if (expenses.length === 0) return []

    return [...expenses].sort((a, b) => {
      switch (sortOption) {
        case 'date-desc':
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        case 'date-asc':
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
        case 'amount-desc': {
          const amountA = Number.parseFloat(
            a.amount.replace(/[^0-9.-]+/g, '') || '0'
          )
          const amountB = Number.parseFloat(
            b.amount.replace(/[^0-9.-]+/g, '') || '0'
          )
          return amountB - amountA
        }
        case 'amount-asc': {
          const amountA = Number.parseFloat(
            a.amount.replace(/[^0-9.-]+/g, '') || '0'
          )
          const amountB = Number.parseFloat(
            b.amount.replace(/[^0-9.-]+/g, '') || '0'
          )
          return amountA - amountB
        }
        default:
          return 0
      }
    })
  }, [expenses, sortOption])

  // Memoize skeleton count to avoid recalculation on every render
  const skeletonCount = useMemo(() => {
    switch (layout) {
      case 'grid':
        return 6 // Show 6 items to fill potential 2x3 or 3x2 grid
      case 'feed':
      case 'compact':
        return 3
      default:
        return 3
    }
  }, [layout])

  // Memoize layout styles to avoid recalculation on every render
  const layoutStyles = useMemo(() => {
    switch (layout) {
      case 'grid':
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
      case 'feed':
        return 'flex flex-col gap-4 max-w-2xl mx-auto'
      case 'compact':
        return 'grid grid-cols-1 gap-2 max-w-xl mx-auto'
      default:
        return ''
    }
  }, [layout])

  // Memoize skeleton items to avoid recreation on every render
  const skeletonItems = useMemo(() => {
    if (!isLoading) return null

    return Array.from({ length: skeletonCount }).map((_, index) => (
      <MemoizedExpenseCard
        key={`skeleton-${index}`}
        expense={{
          id: `skeleton-${index}`,
          amount: '$0.00',
          description: 'Loading...',
          tags: [],
          userId: '',
          createdAt: new Date().toISOString(),
          updatedAt: null
        }}
        isLoading={true}
        className={cn(
          'animate-pulse transition-opacity duration-200',
          layout === 'compact' && 'border-0 bg-transparent shadow-none'
        )}
      />
    ))
  }, [isLoading, skeletonCount, layout])

  // Memoize expense card items to avoid recreation on every render
  const expenseItems = useMemo(() => {
    if (isLoading) return null

    return sortedExpenses.map((expense) => (
      <MemoizedExpenseCard
        key={expense.id}
        expense={expense}
        isAuthor={!!currentUserId && expense.userId === currentUserId}
        onEdit={onEdit}
        onDelete={onDelete}
        onTagClick={handleTagClick}
        className={cn(
          'transition-all duration-200',
          layout === 'compact' && 'border-0 bg-transparent shadow-none'
        )}
      />
    ))
  }, [
    sortedExpenses,
    currentUserId,
    onEdit,
    onDelete,
    layout,
    isLoading,
    handleTagClick
  ])

  // Memoize selected tags display
  const selectedTagsDisplay = useMemo(() => {
    if (!selectedTags || selectedTags.length === 0) return null

    return (
      <div className='flex flex-wrap gap-2 mb-4 mt-2'>
        <span className='text-sm text-muted-foreground mr-1 self-center'>
          Filtered by:
        </span>
        {selectedTags.map((tag) => (
          <Badge
            key={`selected-tag-${tag}`}
            variant='secondary'
            className='flex items-center gap-1 px-2 py-1'
          >
            {tag}
            <Button
              variant='ghost'
              size='sm'
              className='h-4 w-4 p-0 hover:bg-transparent'
              onClick={() => handleTagRemove(tag)}
            >
              <X className='h-3 w-3' />
              <span className='sr-only'>Remove {tag} filter</span>
            </Button>
          </Badge>
        ))}
      </div>
    )
  }, [selectedTags, handleTagRemove])

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* List Header with Controls */}
      <div className='flex items-center justify-between sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2'>
        {header || <div />}
        <div className='flex items-center gap-2'>
          {showSortOptions && (
            <Select value={sortOption} onValueChange={handleSortChange}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Sort by...' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='date-desc'>Newest first</SelectItem>
                <SelectItem value='date-asc'>Oldest first</SelectItem>
                <SelectItem value='amount-desc'>Highest amount</SelectItem>
                <SelectItem value='amount-asc'>Lowest amount</SelectItem>
              </SelectContent>
            </Select>
          )}

          {showLayoutToggle && (
            <div className='flex items-center rounded-md border bg-muted'>
              <Button
                variant='ghost'
                size='sm'
                className={cn('px-3', layout === 'grid' && 'bg-background')}
                onClick={handleGridLayout}
              >
                <Grid className='h-4 w-4' />
                <span className='sr-only'>Grid layout</span>
              </Button>
              <Button
                variant='ghost'
                size='sm'
                className={cn('px-3', layout === 'feed' && 'bg-background')}
                onClick={handleFeedLayout}
              >
                <List className='h-4 w-4' />
                <span className='sr-only'>List layout</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Selected Tags Display */}
      {selectedTagsDisplay}

      {/* Scrollable Content Area */}
      <ScrollArea className='flex-1 w-full'>
        <div className='p-4'>
          {!isLoading && sortedExpenses.length === 0 ? (
            <div className='h-[32rem] flex items-center justify-center text-muted-foreground'>
              <p>No expenses found</p>
            </div>
          ) : (
            <div className={cn('w-full', layoutStyles)}>
              {isLoading ? skeletonItems : expenseItems}
            </div>
          )}
        </div>
        <ScrollBar orientation='vertical' />
      </ScrollArea>

      {/* List Footer */}
      {footer && <div className='mt-4'>{footer}</div>}
    </div>
  )
}
