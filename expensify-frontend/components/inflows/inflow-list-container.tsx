import { SearchBox } from '@/components/generic/search-box/search-box'
import { Card } from '@/components/ui/card'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { cn, Option } from '@/lib/utils'
import { memo, useCallback, useEffect, useMemo } from 'react'
import { useMutative } from 'use-mutative'
import type { InflowCardLayout } from './inflow-card-list'
import { InflowCardList } from './inflow-card-list'
import type { InflowCardData } from './inflow-card/inflow-card'

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  pageCount: number
}

export interface InflowListContainerProps {
  inflows: InflowCardData[]
  isLoading?: boolean
  className?: string
  defaultLayout?: InflowCardLayout
  showLayoutToggle?: boolean
  showSortOptions?: boolean
  currentUserId?: string
  onEdit?: (id: string) => void
  onDelete?: (id: string) => Promise<void> | void
  onSearch: (value: Option<string>) => void
  onPaginationChange?: (pagination: PaginationMeta) => void
  pagination?: PaginationMeta
  searchPlaceholder?: string
  header?: React.ReactNode
  footer?: React.ReactNode
  /**
   * Whether to enable the green hover effect
   * @default true
   */
  enableHoverEffect?: boolean
  /**
   * Intensity of the hover effect
   * @default 'high'
   */
  hoverIntensity?: 'low' | 'medium' | 'high'
  /**
   * Array of currently selected tags for filtering
   */
  selectedTags?: string[]
  /**
   * Callback when a tag is selected for filtering
   */
  onTagSelect?: (tag: string) => void
  /**
   * Callback when a tag is removed from filtering
   */
  onTagRemove?: (tag: string) => void
}

// Define hover effect styles based on intensity
const hoverStyles = {
  low: 'hover:shadow-md hover:border-emerald-500/20 hover:shadow-emerald-500/5',
  medium:
    'hover:shadow-md hover:border-emerald-500/40 hover:shadow-emerald-500/10 hover:border-[1.5px]',
  high: 'hover:shadow-xl hover:border-emerald-500/70 hover:shadow-emerald-500/30 hover:border-2 hover:bg-emerald-50/10 hover:-translate-y-[1px]'
}

// PaginationControls component - only memoize this since it's a complex UI element
// that doesn't need to re-render when parent data changes
const PaginationControls = memo(function PaginationControls({
  paginationState,
  pageNumbers,
  onPageChange
}: {
  paginationState: PaginationMeta
  pageNumbers: (number | 'ellipsis')[]
  onPageChange: (page: number) => void
}) {
  return (
    <Pagination>
      <PaginationContent className='select-none flex items-center justify-center gap-2'>
        <PaginationItem>
          <PaginationPrevious
            href='#'
            onClick={(e) => {
              e.preventDefault()
              onPageChange(paginationState.page - 1)
            }}
            className={cn(
              'cursor-pointer',
              paginationState.page <= 1 && 'pointer-events-none opacity-50'
            )}
          />
        </PaginationItem>

        {pageNumbers.map((pageNumber, i) =>
          pageNumber === 'ellipsis' ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href='#'
                onClick={(e) => {
                  e.preventDefault()
                  onPageChange(pageNumber)
                }}
                isActive={pageNumber === paginationState.page}
                className='cursor-pointer'
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            href='#'
            onClick={(e) => {
              e.preventDefault()
              onPageChange(paginationState.page + 1)
            }}
            className={cn(
              'cursor-pointer',
              paginationState.page >= paginationState.pageCount &&
                'pointer-events-none opacity-50'
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
})

export function InflowListContainer({
  inflows,
  isLoading = false,
  className,
  defaultLayout,
  showLayoutToggle,
  showSortOptions,
  currentUserId,
  onEdit,
  onDelete,
  onSearch,
  onPaginationChange,
  pagination = {
    page: 1,
    limit: 10,
    total: 0,
    pageCount: 0
  },
  searchPlaceholder = 'Search inflows...',
  header,
  footer,
  enableHoverEffect = true,
  hoverIntensity = 'high',
  selectedTags = [],
  onTagSelect,
  onTagRemove
}: InflowListContainerProps) {
  const [paginationState, setPaginationState] =
    useMutative<PaginationMeta>(pagination)

  // Update internal pagination state when props change
  useEffect(() => {
    // Only update if values actually changed to prevent unnecessary state updates
    if (
      pagination.page !== paginationState.page ||
      pagination.limit !== paginationState.limit ||
      pagination.total !== paginationState.total ||
      pagination.pageCount !== paginationState.pageCount
    ) {
      setPaginationState((draft) => {
        draft.page = pagination.page
        draft.limit = pagination.limit
        draft.total = pagination.total
        draft.pageCount = pagination.pageCount
      })
    }
  }, [pagination, paginationState, setPaginationState])

  // Memoize the page numbers calculation to avoid recalculating on every render
  const pageNumbers = useMemo(() => {
    const { page, pageCount } = paginationState
    const pages: (number | 'ellipsis')[] = []

    if (pageCount <= 7) {
      // If 7 or fewer pages, show all
      for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (page > 3) {
        pages.push('ellipsis')
      }

      // Show pages around current page
      const start = Math.max(2, page - 1)
      const end = Math.min(pageCount - 1, page + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      if (page < pageCount - 2) {
        pages.push('ellipsis')
      }

      // Always show last page if there are pages
      if (pageCount > 1) {
        pages.push(pageCount)
      }
    }

    return pages
  }, [paginationState.page, paginationState.pageCount])

  // Memoize the page change handler to prevent recreation on each render
  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage === paginationState.page) return

      setPaginationState((draft) => {
        draft.page = newPage
      })

      onPaginationChange?.({
        ...paginationState,
        page: newPage
      })
    },
    [paginationState, setPaginationState, onPaginationChange]
  )

  // Memoize the search handler to prevent recreation on each render
  const handleSearch = useCallback(
    (value: Option<string>) => {
      onSearch(value)
    },
    [onSearch]
  )

  // Memoize the tag selection handler
  const handleTagSelect = useCallback(
    (tag: string) => {
      if (onTagSelect) {
        onTagSelect(tag)
      }
    },
    [onTagSelect]
  )

  // Memoize the tag removal handler
  const handleTagRemove = useCallback(
    (tag: string) => {
      if (onTagRemove) {
        onTagRemove(tag)
      }
    },
    [onTagRemove]
  )

  // Determine if pagination should be shown - simple calculation, no need for useMemo
  const shouldShowPagination = paginationState.total > 0

  // Memoize the card container class to prevent recalculation on every render
  const cardClassName = useMemo(() => {
    return cn(
      'flex flex-col h-[40rem] border-border/60 shadow-sm transition-all duration-300',
      enableHoverEffect && hoverStyles[hoverIntensity],
      'dark:bg-card/80 dark:border-border/40',
      'hover:cursor-pointer',
      className
    )
  }, [className, enableHoverEffect, hoverIntensity])

  return (
    <Card className={cardClassName}>
      <div className='p-4 border-b'>
        <SearchBox
          placeholder={searchPlaceholder}
          onSearch={handleSearch}
          className='w-full'
        />
      </div>

      <div className='flex flex-col flex-1 min-h-0'>
        <div className='flex-1 overflow-y-auto px-4'>
          <InflowCardList
            inflows={inflows}
            isLoading={isLoading}
            defaultLayout={defaultLayout}
            showLayoutToggle={showLayoutToggle}
            showSortOptions={showSortOptions}
            currentUserId={currentUserId || ''}
            onEdit={onEdit}
            onDelete={onDelete}
            header={header}
            footer={footer}
            selectedTags={selectedTags}
            onTagSelect={handleTagSelect}
            onTagRemove={handleTagRemove}
          />
          <div className='h-4' />
        </div>

        {/* Always show pagination if we have total items, even during loading */}
        {shouldShowPagination && (
          <div className='px-4 py-3 border-t bg-card'>
            <PaginationControls
              paginationState={paginationState}
              pageNumbers={pageNumbers}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </Card>
  )
}

// Only memoize the entire component if it's used in a context where parent components
// frequently re-render with the same props
export const MemoizedInflowListContainer = memo(InflowListContainer)
