import { Button } from '@/components/ui/button'
import {
  EnhancedCard,
  EnhancedCardContent,
  EnhancedCardDescription,
  EnhancedCardHeader,
  EnhancedCardTitle
} from '@/components/ui/enhanced-card'
import { Separator } from '@/components/ui/separator'
import { StatsCard } from '@/components/ui/stats-card'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  InfoIcon,
  CalendarIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  CircleDollarSignIcon,
  BarChart3Icon,
  ChevronRightIcon
} from 'lucide-react'
import { BalanceSection } from './balance-section'
import { StatsInfoButton } from './stats-info-button'
import { TransactionSummary } from './transaction-summary'
import { useState } from 'react'

type FinanicalSummaryBalance = {
  /**
   * @description Total amount of all inflows
   * @example 5000.00
   */
  totalInflows: number
  /**
   * @description Total amount of all expenses
   * @example 3000.00
   */
  totalExpenses: number
  /**
   * @description Current balance (inflows - expenses)
   * @example 2000.00
   */
  balance: number
}

type FinancialStatisticsDto = {
  /**
   * @description Average amount of inflows
   * @example 1000.00
   */
  averageInflow: number
  /**
   * @description Average amount of expenses
   * @example 800.00
   */
  averageExpense: number
  /**
   * @description Average monthly inflow
   * @example 1000.00
   */
  averageMonthlyInflow: number
  /**
   * @description Average monthly expense
   * @example 800.00
   */
  averageMonthlyExpense: number
  /**
   * @description Total number of inflow transactions
   * @example 25
   */
  totalInflowCount: number
  /**
   * @description Total number of expense transactions
   * @example 50
   */
  totalExpenseCount: number
}

type FinancialSummaryDto = {
  currentBalance: FinanicalSummaryBalance
  statistics: FinancialStatisticsDto
}

export interface FinancialStatisticsCardProps {
  /** Financial summary data containing balance and statistics */
  data: FinancialSummaryDto
  /** Optional className for styling overrides */
  className?: string
  /** Callback fired when clicking on the inflow section */
  onInflowClick?: () => void
  /** Callback fired when clicking on the expenses section */
  onExpenseClick?: () => void
  /** Callback fired when clicking on the balance section */
  onBalanceClick?: () => void
}

/**
 * A comprehensive financial summary card that displays current balance,
 * transaction totals, and financial statistics.
 *
 * Features:
 * - Current balance with breakdown on hover
 * - Total inflows and expenses with transaction counts
 * - Average transaction statistics
 * - Interactive sections with click handlers
 * - Responsive design with dark mode support
 * - Collapsible statistics section for compact view
 *
 * @example
 * ```tsx
 * <FinancialSummaryCard
 *   data={financialData}
 *   onInflowClick={() => handleInflowClick()}
 *   onExpenseClick={() => handleExpenseClick()}
 *   onBalanceClick={() => handleBalanceClick()}
 * />
 * ```
 */
export function FinancialSummaryCard({
  data,
  className,
  onInflowClick,
  onExpenseClick,
  onBalanceClick
}: FinancialStatisticsCardProps) {
  const { currentBalance, statistics } = data
  const [showStats, setShowStats] = useState(true)

  // Calculate the percentage of expenses relative to inflows
  const expenseRatio =
    currentBalance.totalInflows > 0
      ? (currentBalance.totalExpenses / currentBalance.totalInflows) * 100
      : 0

  return (
    <EnhancedCard className={cn('h-full', className)} hoverIntensity='high'>
      <EnhancedCardHeader className='items-center pb-0 space-y-1 pt-4'>
        <div className='flex items-center gap-2'>
          <CircleDollarSignIcon className='h-5 w-5 text-primary/70' />
          <EnhancedCardTitle>Financial Summary</EnhancedCardTitle>
        </div>
        <EnhancedCardDescription>
          Track your inflows, expenses, and overall balance
        </EnhancedCardDescription>
        <div className='absolute right-4 top-4'>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='h-8 w-8 rounded-full hover:bg-secondary/20 transition-colors'
              >
                <InfoIcon className='h-4 w-4 text-muted-foreground/70' />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side='left'
              className='bg-popover/95 backdrop-blur-sm border border-border/50 shadow-lg'
            >
              View your financial activity overview
            </TooltipContent>
          </Tooltip>
        </div>
      </EnhancedCardHeader>

      <EnhancedCardContent className='flex-1 px-4 pb-3 pt-2'>
        {/* Balance Section with Progress Indicator */}
        <div className='space-y-2'>
          <BalanceSection balance={currentBalance} onClick={onBalanceClick} />

          {/* Expense to Income Ratio Progress Bar */}
          <div className='px-1 space-y-1'>
            <div className='flex justify-between items-center text-xs text-muted-foreground'>
              <span>Expense to Income Ratio</span>
              <span
                className={cn(
                  expenseRatio > 90
                    ? 'text-red-500'
                    : expenseRatio > 75
                      ? 'text-amber-500'
                      : 'text-emerald-500'
                )}
              >
                {expenseRatio.toFixed(0)}%
              </span>
            </div>
            <div className='h-1.5 w-full bg-secondary/20 rounded-full overflow-hidden'>
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-500',
                  expenseRatio > 90
                    ? 'bg-red-500'
                    : expenseRatio > 75
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                )}
                style={{ width: `${Math.min(expenseRatio, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Transaction Summaries */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4'>
          <TransactionSummary
            type='inflow'
            amount={currentBalance.totalInflows}
            count={statistics.totalInflowCount}
            onClick={onInflowClick}
          />
          <TransactionSummary
            type='expense'
            amount={currentBalance.totalExpenses}
            count={statistics.totalExpenseCount}
            onClick={onExpenseClick}
          />
        </div>

        <Separator className='my-3 bg-border/50' />

        {/* Statistics Section with Toggle */}
        <div className='space-y-2'>
          <div
            className='flex items-center justify-between cursor-pointer'
            onClick={() => setShowStats(!showStats)}
          >
            <div className='flex items-center gap-1.5'>
              <BarChart3Icon className='h-4 w-4 text-muted-foreground/70' />
              <h3 className='text-base font-semibold tracking-tight text-foreground'>
                Statistics
              </h3>
            </div>
            <div className='flex items-center gap-2'>
              <StatsInfoButton />
              <Button
                variant='ghost'
                size='icon'
                className='h-6 w-6 rounded-full hover:bg-secondary/20 transition-colors'
              >
                <ChevronRightIcon
                  className={cn(
                    'h-4 w-4 text-muted-foreground transition-transform duration-200',
                    showStats && 'rotate-90'
                  )}
                />
              </Button>
            </div>
          </div>

          <div
            className={cn(
              'grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 overflow-hidden transition-all duration-300',
              showStats ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            <StatsCard
              title='Monthly Inflow'
              subtitle='Monthly average'
              value={statistics.averageMonthlyInflow}
              icon={TrendingUpIcon}
              secondaryIcon={CalendarIcon}
              variant='success'
              className='hover:border-success/30 transition-colors'
            />
            <StatsCard
              title='Monthly Expense'
              subtitle='Monthly average'
              value={statistics.averageMonthlyExpense}
              icon={TrendingDownIcon}
              secondaryIcon={CalendarIcon}
              variant='danger'
              className='hover:border-danger/30 transition-colors'
            />
            <StatsCard
              title='Avg. Transaction Inflow'
              subtitle='Per transaction'
              value={statistics.averageInflow}
              icon={CircleDollarSignIcon}
              variant='success'
              className='hover:border-success/30 transition-colors'
            />
            <StatsCard
              title='Avg. Transaction Expense'
              subtitle='Per transaction'
              value={statistics.averageExpense}
              icon={CircleDollarSignIcon}
              variant='danger'
              className='hover:border-danger/30 transition-colors'
            />
          </div>
        </div>
      </EnhancedCardContent>
    </EnhancedCard>
  )
}
