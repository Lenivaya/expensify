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

/**
 * Type representing the current financial balance state
 * @interface FinanicalSummaryBalance
 */
type FinanicalSummaryBalance = {
  /**
   * Total amount of all inflows (income, deposits, etc.)
   * @type {number}
   * @description Sum of all positive financial transactions
   * @example 5000.00
   */
  totalInflows: number

  /**
   * Total amount of all expenses (purchases, bills, etc.)
   * @type {number}
   * @description Sum of all negative financial transactions
   * @example 3000.00
   */
  totalExpenses: number

  /**
   * Current net balance (inflows - expenses)
   * @type {number}
   * @description The difference between total inflows and total expenses
   * @example 2000.00
   */
  balance: number
}

/**
 * Type representing financial statistics and metrics
 * @interface FinancialStatisticsDto
 */
type FinancialStatisticsDto = {
  /**
   * Average amount per inflow transaction
   * @type {number}
   * @description Calculated as total inflows divided by number of inflow transactions
   * @example 1000.00
   */
  averageInflow: number

  /**
   * Average amount per expense transaction
   * @type {number}
   * @description Calculated as total expenses divided by number of expense transactions
   * @example 800.00
   */
  averageExpense: number

  /**
   * Average monthly inflow amount
   * @type {number}
   * @description Total inflows divided by number of months in the period
   * @example 1000.00
   */
  averageMonthlyInflow: number

  /**
   * Average monthly expense amount
   * @type {number}
   * @description Total expenses divided by number of months in the period
   * @example 800.00
   */
  averageMonthlyExpense: number

  /**
   * Total count of inflow transactions
   * @type {number}
   * @description Number of positive financial transactions recorded
   * @example 25
   */
  totalInflowCount: number

  /**
   * Total count of expense transactions
   * @type {number}
   * @description Number of negative financial transactions recorded
   * @example 50
   */
  totalExpenseCount: number
}

/**
 * Complete financial summary data transfer object
 * @interface FinancialSummaryDto
 */
type FinancialSummaryDto = {
  /**
   * Current balance information
   * @type {FinanicalSummaryBalance}
   */
  currentBalance: FinanicalSummaryBalance

  /**
   * Statistical metrics
   * @type {FinancialStatisticsDto}
   */
  statistics: FinancialStatisticsDto
}

/**
 * Props for the FinancialSummaryCard component
 * @interface FinancialStatisticsCardProps
 */
export interface FinancialStatisticsCardProps {
  /**
   * Financial summary data containing balance and statistics
   * @type {FinancialSummaryDto}
   * @description
   * Complete financial data object containing current balance information
   * and statistical metrics about the user's financial activity
   */
  data: FinancialSummaryDto

  /**
   * Optional className for styling overrides
   * @type {string}
   * @description Additional CSS classes to apply to the component
   */
  className?: string

  /**
   * Callback fired when clicking on the inflow section
   * @type {() => void}
   * @description
   * Handler for inflow section clicks. Can be used to navigate to
   * detailed inflow views or open inflow-specific dialogs
   */
  onInflowClick?: () => void

  /**
   * Callback fired when clicking on the expenses section
   * @type {() => void}
   * @description
   * Handler for expense section clicks. Can be used to navigate to
   * detailed expense views or open expense-specific dialogs
   */
  onExpenseClick?: () => void

  /**
   * Callback fired when clicking on the balance section
   * @type {() => void}
   * @description
   * Handler for balance section clicks. Can be used to navigate to
   * detailed balance views or open balance-specific dialogs
   */
  onBalanceClick?: () => void
}

/**
 * A comprehensive financial summary card component
 *
 * @module FinancialSummaryCard
 * @description
 * Renders a beautiful and interactive card that provides a complete overview
 * of a user's financial status. The component includes current balance,
 * transaction summaries, and detailed statistics with a collapsible section.
 *
 * Features:
 * - Current balance display with hover breakdown
 * - Inflow and expense summaries with transaction counts
 * - Expense to income ratio visualization
 * - Collapsible statistics section
 * - Interactive sections with click handlers
 * - Tooltips for additional information
 * - Responsive design with dark mode support
 * - Beautiful gradients and hover effects
 *
 * Visual Elements:
 * - Balance card with hover details
 * - Progress bar for expense ratio
 * - Transaction summary cards
 * - Statistics section with toggle
 * - Info tooltips
 * - Icons and indicators
 *
 * States:
 * - Collapsible statistics (showStats)
 * - Loading states for data
 * - Interactive hover states
 * - Color-coded indicators based on ratios
 *
 * @example
 * ```tsx
 * <FinancialSummaryCard
 *   data={{
 *     currentBalance: {
 *       totalInflows: 5000,
 *       totalExpenses: 3000,
 *       balance: 2000
 *     },
 *     statistics: {
 *       averageInflow: 1000,
 *       averageExpense: 600,
 *       averageMonthlyInflow: 2500,
 *       averageMonthlyExpense: 1500,
 *       totalInflowCount: 25,
 *       totalExpenseCount: 50
 *     }
 *   }}
 *   onInflowClick={() => navigate('/inflows')}
 *   onExpenseClick={() => navigate('/expenses')}
 *   onBalanceClick={() => navigate('/balance')}
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
    <EnhancedCard className={cn('h-full', className)}>
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
                style={{
                  width: `${Math.min(expenseRatio, 100)}%`
                }}
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
