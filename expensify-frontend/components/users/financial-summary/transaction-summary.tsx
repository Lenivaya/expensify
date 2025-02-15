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

interface TransactionSummaryProps {
  /** Type of transaction summary to display */
  type: 'inflow' | 'expense'
  /** Total amount for this transaction type */
  amount: string
  /** Number of transactions */
  count: number
  /** Optional click handler */
  onClick?: () => void
}

/**
 * Displays a summary of transactions (either inflows or expenses)
 * with the total amount and transaction count
 */
export function TransactionSummary({
  type,
  amount,
  count,
  onClick
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
        'rounded-xl bg-gradient-to-br p-4',
        'text-left border transition-all duration-300',
        'hover:scale-[1.02] hover:shadow-lg',
        'after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-br',
        'after:opacity-0 hover:after:opacity-100 after:transition-opacity after:-z-10',
        styles[type].bg,
        styles[type].border,
        onClick && styles[type].hover,
        !onClick && 'cursor-default'
      )}
      onClick={onClick}
    >
      <div className='flex items-center justify-between gap-2'>
        <div className='flex items-center gap-2'>
          <div className={cn('rounded-full p-1.5', styles[type].iconBg)}>
            <Icon className={cn('h-4 w-4', styles[type].iconColor)} />
          </div>
          <span className='text-sm font-medium'>
            Total {isInflow ? 'Inflows' : 'Expenses'}
          </span>
        </div>
        <TrendIcon className={cn('h-4 w-4', styles[type].trendColor)} />
      </div>
      <div className='space-y-1'>
        <div className='flex items-baseline gap-1 justify-center'>
          <CurrencyDisplay amount={amount} variant={variant} size='md' />
        </div>
        <p className='text-sm text-muted-foreground text-center'>
          {count.toLocaleString()} transactions
        </p>
      </div>
    </Button>
  )
}
