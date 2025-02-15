import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { StatsCard } from '@/components/ui/stats-card'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { ArrowDownIcon, ArrowUpIcon, InfoIcon } from 'lucide-react'
import { BalanceSection } from './balance-section'
import { StatsInfoButton } from './stats-info-button'
import { TransactionSummary } from './transaction-summary'

type FinanicalSummaryBalance = {
  /**
   * @description Total amount of all inflows
   * @example 5000.00
   */
  totalInflows: string
  /**
   * @description Total amount of all expenses
   * @example 3000.00
   */
  totalExpenses: string
  /**
   * @description Current balance (inflows - expenses)
   * @example 2000.00
   */
  balance: string
}

type FinancialStatisticsDto = {
  /**
   * @description Average amount of inflows
   * @example 1000.00
   */
  averageInflow: string
  /**
   * @description Average amount of expenses
   * @example 800.00
   */
  averageExpense: string
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

  return (
    <Card
      className={cn(
        'w-full overflow-hidden backdrop-blur-sm',
        'border-secondary/20 bg-background/50',
        'dark:bg-background/30',
        className
      )}
    >
      <CardHeader className='space-y-2 pb-6'>
        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            <CardTitle className='text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
              Financial Summary
            </CardTitle>
            <CardDescription className='text-muted-foreground/80'>
              Track your inflows, expenses, and overall balance
            </CardDescription>
          </div>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='h-9 w-9 rounded-full hover:bg-secondary/20 transition-colors'
              >
                <InfoIcon className='h-[1.125rem] w-[1.125rem] text-muted-foreground/70' />
              </Button>
            </TooltipTrigger>
            <TooltipContent className='bg-popover/95 backdrop-blur-sm'>
              View your financial activity overview
            </TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>

      <CardContent className='grid gap-8'>
        {/* Balance Section */}
        <BalanceSection balance={currentBalance} onClick={onBalanceClick} />

        {/* Transaction Summaries */}
        <div className='grid grid-cols-2 gap-4'>
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

        <Separator className='my-2 bg-border/50' />

        {/* Statistics Section */}
        <div className='space-y-6'>
          <div className='flex items-center justify-between'>
            <h3 className='text-lg font-semibold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
              Statistics
            </h3>
            <StatsInfoButton />
          </div>
          <div className='grid grid-cols-2 gap-6'>
            <StatsCard
              title='Average Inflow'
              value={statistics.averageInflow}
              icon={ArrowUpIcon}
              variant='success'
            />
            <StatsCard
              title='Average Expense'
              value={statistics.averageExpense}
              icon={ArrowDownIcon}
              variant='danger'
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
