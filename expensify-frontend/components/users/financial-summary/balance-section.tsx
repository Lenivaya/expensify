import { CurrencyDisplay } from '@/components/ui/currency-display'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { FinanicalSummaryBalance } from './types'

interface BalanceSectionProps {
  /** Balance data containing total inflows, expenses and current balance */
  balance: FinanicalSummaryBalance
  /** Optional click handler for the balance section */
  onClick?: () => void
}

/**
 * Displays the current balance with a hover card showing the breakdown
 * of total inflows and expenses
 */
export function BalanceSection({ balance, onClick }: BalanceSectionProps) {
  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>
        <Button
          variant='ghost'
          className={cn(
            'h-auto w-full grid grid-cols-[1fr,auto] items-center gap-4',
            'rounded-xl bg-gradient-to-br from-secondary/10 via-secondary/5 to-background/0 p-6',
            'border border-border/50 text-left shadow-sm transition-all duration-300',
            'dark:from-secondary/20 dark:via-secondary/10 dark:to-background/5 dark:border-secondary/20',
            'hover:scale-[1.01] hover:shadow-lg',
            'after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-br',
            'after:from-secondary/5 after:to-transparent after:opacity-0',
            'hover:after:opacity-100 after:transition-opacity after:-z-10',
            onClick && [
              'hover:from-secondary/20 hover:via-secondary/15 hover:to-background/5',
              'hover:border-secondary/40',
              'dark:hover:from-secondary/30 dark:hover:via-secondary/20',
              'dark:hover:to-background/10 dark:hover:border-secondary/50'
            ],
            !onClick && 'cursor-default'
          )}
          onClick={onClick}
        >
          <div className='space-y-1'>
            <p className='text-sm font-medium text-muted-foreground'>
              Current Balance
            </p>
            <CurrencyDisplay
              amount={balance.balance}
              size='lg'
              variant={Number(balance.balance) < 0 ? 'danger' : 'primary'}
            />
          </div>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className='w-80 backdrop-blur-sm bg-popover/95'>
        <div className='space-y-3'>
          <p className='text-sm font-medium'>Balance Breakdown</p>
          <div className='grid grid-cols-2 gap-4 text-sm'>
            <div className='space-y-1'>
              <p className='text-muted-foreground'>Total Inflows</p>
              <CurrencyDisplay
                amount={balance.totalInflows}
                variant='success'
                size='sm'
                showSign
              />
            </div>
            <div className='space-y-1'>
              <p className='text-muted-foreground'>Total Expenses</p>
              <CurrencyDisplay
                amount={balance.totalExpenses}
                variant='danger'
                size='sm'
                showSign
              />
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
