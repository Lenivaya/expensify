import type { InflowCardData } from './inflow-card/inflow-card'
import { InflowCard } from './inflow-card/inflow-card'
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
 * Layout options for the inflow card list
 */
export type InflowCardLayout = 'grid' | 'feed' | 'compact'

/**
 * Sort options for inflow cards
 */
export type InflowSortOption =
  | 'date-desc'
  | 'date-asc'
  | 'amount-desc'
  | 'amount-asc'

/**
 * Props for the InflowCardList component
 * @interface InflowCardListProps
 * @property {InflowCardType[]} inflows - Array of inflow data to display
 * @property {boolean} [isLoading] - Loading state for the list
 * @property {string} [className] - Additional CSS classes
 * @property {InflowCardLayout} [defaultLayout='grid'] - Default layout mode
 * @property {boolean} [showLayoutToggle] - Whether to show layout toggle controls
 * @property {boolean} [showSortOptions] - Whether to show sort options
 * @property {number} [maxHeight] - Maximum height of the list container
 * @property {(id: string) => void} [onInflowEdit] - Callback when an inflow is edited
 * @property {(id: string) => void} [onInflowDelete] - Callback when an inflow is deleted
 * @property {(id: string) => void} [onInflowClick] - Callback when an inflow is clicked
 * @property {React.ReactNode} [header] - Custom header content
 * @property {React.ReactNode} [footer] - Custom footer content
 */
export interface InflowCardListProps {
  inflows: InflowCardData[]
  isLoading?: boolean
  className?: string
  defaultLayout?: InflowCardLayout
  showLayoutToggle?: boolean
  showSortOptions?: boolean
  maxHeight?: number
  onInflowEdit?: (id: string) => void
  onInflowDelete?: (id: string) => void
  onInflowClick?: (id: string) => void
  header?: React.ReactNode
  footer?: React.ReactNode
}

/**
 * InflowCardList component for displaying a list of inflow cards in various layouts
 * @component
 * @example
 * ```tsx
 * <InflowCardList
 *   inflows={inflowData}
 *   defaultLayout="grid"
 *   showLayoutToggle={true}
 *   showSortOptions={true}
 *   onInflowClick={(id) => handleInflowSelect(id)}
 * />
 * ```
 */
export const InflowCardList: React.FC<
  InflowCardListProps
> = ({
  inflows,
  isLoading = false,
  className,
  defaultLayout = 'grid',
  showLayoutToggle = true,
  showSortOptions = true,
  maxHeight,
  onInflowEdit,
  onInflowDelete,
  onInflowClick,
  header,
  footer
}) => {
  // State for layout and sort options
  const [layout, setLayout] =
    useState<InflowCardLayout>(defaultLayout)
  const [sortOption, setSortOption] =
    useState<InflowSortOption>('date-desc')

  // Sort inflows based on selected option
  const sortedInflows = [...inflows].sort((a, b) => {
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
                setSortOption(value as InflowSortOption)
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
          {sortedInflows.map((inflow) => (
            <InflowCard
              key={inflow.id}
              inflow={inflow}
              isLoading={isLoading}
              onEdit={onInflowEdit}
              onDelete={onInflowDelete}
              onClick={onInflowClick}
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
