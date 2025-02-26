// Create TransactionSummary component

import { Button } from '@/components/ui/button'
import { CurrencyDisplay } from '@/components/ui/currency-display'
import { cn } from '@/lib/utils'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  TrendingDownIcon,
  TrendingUpIcon
} from 'lucide-react'

/**
 * Props for the TransactionSummary component
 * @interface TransactionSummaryProps
 */
interface TransactionSummaryProps {
  /**
   * Type of transaction summary to display
   * @type {'inflow' | 'expense'}
   * @description
   * Determines the visual style and content of the summary:
   * - 'inflow': Green theme with upward arrows
   * - 'expense': Red theme with downward arrows
   */
  type: 'inflow' | 'expense'

  /**
   * Total amount for this transaction type
   * @type {number}
   * @description
   * The sum of all transactions of this type.
   * For expenses, this should be a positive number (will be displayed as negative).
   */
  amount: number

  /**
   * Number of transactions
   * @type {number}
   * @description
   * Total count of transactions of this type.
   * Used to display transaction count in the summary.
   */
  count: number

  /**
   * Optional click handler
   * @type {() => void}
   * @description
   * When provided, makes the summary card clickable and adds hover effects.
   * Can be used to navigate to filtered transaction views.
   */
  onClick?: () => void

  /**
   * Optional compact mode for smaller displays
   * @type {boolean}
   * @description
   * When true, reduces padding and font sizes for a more compact display.
   * Useful for mobile views or when space is limited.
   * @default false
   */
  compact?: boolean
}

/**
 * A component that displays a summary of transactions
 *
 * @module TransactionSummary
 * @description
 * Renders a beautiful card displaying a summary of either inflows or expenses.
 * Features a modern design with gradient backgrounds, icons, and hover effects.
 * Can be used in both standard and compact modes for flexible layouts.
 *
 * Features:
 * - Color-coded design (green for inflows, red for expenses)
 * - Gradient background with hover effects
 * - Directional icons indicating transaction type
 * - Trend indicator icon
 * - Transaction count display
 * - Responsive layout
 * - Compact mode for space-constrained scenarios
 * - Interactive hover effects when clickable
 *
 * Visual Elements:
 * - Transaction type indicator icon
 * - Total amount display
 * - Transaction count
 * - Trend icon
 * - Gradient background
 * - Hover animations
 *
 * @example
 * ```tsx
 * // Standard usage
 * <TransactionSummary
 *   type="inflow"
 *   amount={5000}
 *   count={25}
 *   onClick={() => navigate('/transactions?type=inflow')}
 * />
 *
 * // Compact mode
 * <TransactionSummary
 *   type="expense"
 *   amount={3000}
 *   count={50}
 *   compact={true}
 * />
 * ```
 */
export function TransactionSummary({
  type,
  amount,
  count,
  onClick,
  compact = false
}: TransactionSummaryProps) {
  const isInflow = type === 'inflow'
  const variant = isInflow ? 'success' : 'danger'

  const styles = {
    inflow: {
      bg: 'from-emerald-500/5 to-emerald-500/0 dark:from-emerald-400/10 dark:to-emerald-400/0',
      border: 'border-emerald-500/10 dark:border-emerald-400/10',
      hover: [
        'hover:from-emerald-500/10 hover:to-emerald-500/5',
        'hover:border-emerald-500/30',
        'dark:hover:from-emerald-400/15 dark:hover:to-emerald-400/5',
        'dark:hover:border-emerald-400/30'
      ],
      iconBg:
        'bg-emerald-500/10 dark:bg-emerald-400/10 dark:border dark:border-emerald-400/20',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      trendColor: 'text-emerald-500/70 dark:text-emerald-400/60'
    },
    expense: {
      bg: 'from-red-500/5 to-red-500/0 dark:from-red-400/10 dark:to-red-400/0',
      border: 'border-red-500/10 dark:border-red-400/10',
      hover: [
        'hover:from-red-500/10 hover:to-red-500/5',
        'hover:border-red-500/30',
        'dark:hover:from-red-400/15 dark:hover:to-red-400/5',
        'dark:hover:border-red-400/30'
      ],
      iconBg:
        'bg-red-500/10 dark:bg-red-400/10 dark:border dark:border-red-400/20',
      iconColor: 'text-red-600 dark:text-red-400',
      trendColor: 'text-red-500/70 dark:text-red-400/60'
    }
  }

  const Icon = isInflow ? ArrowUpIcon : ArrowDownIcon
  const TrendIcon = isInflow ? TrendingUpIcon : TrendingDownIcon

  return (
    <Button
      variant='ghost'
      className={cn(
        'h-auto w-full grid content-start gap-3',
        'rounded-xl bg-gradient-to-br',
        'text-left border transition-all duration-300',
        'hover:scale-[1.02] hover:shadow-lg',
        'after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-br',
        'after:opacity-0 hover:after:opacity-100 after:transition-opacity after:-z-10',
        compact ? 'p-3' : 'p-4',
        styles[type].bg,
        styles[type].border,
        onClick && styles[type].hover,
        !onClick && 'cursor-default'
      )}
      onClick={onClick}
    >
      <div className='flex items-center justify-between gap-2'>
        <div className='flex items-center gap-2'>
          <div
            className={cn(
              'rounded-full',
              compact ? 'p-1' : 'p-1.5',
              styles[type].iconBg
            )}
          >
            <Icon className={cn('h-4 w-4', styles[type].iconColor)} />
          </div>
          <span className={cn('font-medium', compact ? 'text-xs' : 'text-sm')}>
            {compact
              ? isInflow
                ? 'Inflows'
                : 'Expenses'
              : `Total ${isInflow ? 'Inflows' : 'Expenses'}`}
          </span>
        </div>
        <TrendIcon className={cn('h-4 w-4', styles[type].trendColor)} />
      </div>
      <div className='space-y-1'>
        <div className='flex items-baseline gap-1 justify-center'>
          <CurrencyDisplay
            amount={amount}
            variant={variant}
            size={compact ? 'sm' : 'md'}
          />
        </div>
        <p
          className={cn(
            'text-muted-foreground text-center',
            compact ? 'text-xs' : 'text-sm'
          )}
        >
          {count.toLocaleString()} transactions
        </p>
      </div>
    </Button>
  )
}
