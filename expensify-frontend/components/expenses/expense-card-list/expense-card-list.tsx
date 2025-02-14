import type { ExpenseCardData } from '../expense-card/expense-card'
import { ExpenseCard } from '../expense-card/expense-card'
import { cn } from '@/lib/utils'
import { Grid, List } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useState } from 'react'
import type React from 'react'

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
  maxHeight?: number
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onExpenseClick?: (id: string) => void
  header?: React.ReactNode
  footer?: React.ReactNode
}

/**
 * ExpenseCardList component for displaying a list of expense cards in various layouts
 */
export const ExpenseCardList: React.FC<
  ExpenseCardListProps
> = ({
  expenses,
  isLoading = false,
  className,
  defaultLayout = 'grid',
  showLayoutToggle = true,
  showSortOptions = true,
  maxHeight,
  onEdit,
  onDelete,
  onExpenseClick,
  header,
  footer
}) => {
  // State for layout and sort options
  const [layout, setLayout] =
    useState<ExpenseCardLayout>(defaultLayout)
  const [sortOption, setSortOption] =
    useState<ExpenseSortOption>('date-desc')

  // Sort expenses based on selected option
  const sortedExpenses = [...expenses].sort((a, b) => {
    switch (sortOption) {
      case 'date-desc':
        return (
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
        )
      case 'date-asc':
        return (
          new Date(a.createdAt).getTime() -
          new Date(b.createdAt).getTime()
        )
      case 'amount-desc':
        return (
          Number.parseFloat(
            b.amount.replace(/[^0-9.-]+/g, '')
          ) -
          Number.parseFloat(
            a.amount.replace(/[^0-9.-]+/g, '')
          )
        )
      case 'amount-asc':
        return (
          Number.parseFloat(
            a.amount.replace(/[^0-9.-]+/g, '')
          ) -
          Number.parseFloat(
            b.amount.replace(/[^0-9.-]+/g, '')
          )
        )
      default:
        return 0
    }
  })

  // Layout-specific styles
  const getLayoutStyles = () => {
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
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* List Header with Controls */}
      <div className="flex items-center justify-between">
        {header || <div />}
        <div className="flex items-center gap-2">
          {showSortOptions && (
            <Select
              value={sortOption}
              onValueChange={(value) =>
                setSortOption(value as ExpenseSortOption)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">
                  Newest first
                </SelectItem>
                <SelectItem value="date-asc">
                  Oldest first
                </SelectItem>
                <SelectItem value="amount-desc">
                  Highest amount
                </SelectItem>
                <SelectItem value="amount-asc">
                  Lowest amount
                </SelectItem>
              </SelectContent>
            </Select>
          )}

          {showLayoutToggle && (
            <div className="flex items-center rounded-md border bg-muted">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  'px-3',
                  layout === 'grid' && 'bg-background'
                )}
                onClick={() => setLayout('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  'px-3',
                  layout === 'feed' && 'bg-background'
                )}
                onClick={() => setLayout('feed')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Scrollable Content Area */}
      <ScrollArea
        className={cn(
          'rounded-md border',
          maxHeight && `max-h-[${maxHeight}px]`
        )}
      >
        <div className={cn('p-4', getLayoutStyles())}>
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <ExpenseCard
                  key={`skeleton-${
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    index
                  }`}
                  expense={{
                    id: `skeleton-${index}`,
                    amount: '$0.00',
                    description: 'Loading...',
                    tags: [],
                    userId: '',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                  }}
                  isLoading={true}
                  className={cn(
                    layout === 'compact' &&
                      'border-0 bg-transparent shadow-none'
                  )}
                />
              ))
            : sortedExpenses.map((expense) => (
                <ExpenseCard
                  key={expense.id}
                  expense={expense}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onClick={onExpenseClick}
                  className={cn(
                    layout === 'compact' &&
                      'border-0 bg-transparent shadow-none'
                  )}
                />
              ))}
        </div>
      </ScrollArea>

      {/* List Footer */}
      {footer && <div className="mt-4">{footer}</div>}
    </div>
  )
}
