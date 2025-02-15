import { cn } from '@/lib/utils'
import { Card, CardHeader, CardDescription, CardTitle } from './card'
import type { LucideIcon } from 'lucide-react'
import { CurrencyDisplay } from './currency-display'

interface StatsCardProps {
  /** Title of the stats card */
  title: string
  /** Value to display */
  value: string | number
  /** Icon to display */
  icon: LucideIcon
  /** Color variant */
  variant?: 'success' | 'danger'
  /** Optional className for styling */
  className?: string
}

/**
 * A card component for displaying statistics with consistent styling
 *
 * @example
 * ```tsx
 * <StatsCard
 *   title="Average Inflow"
 *   value="1234.56"
 *   icon={ArrowUpIcon}
 *   variant="success"
 * />
 * ```
 */
export function StatsCard({
  title,
  value,
  icon: Icon,
  variant = 'success',
  className
}: StatsCardProps) {
  const variantClasses = {
    success: {
      border: 'border-emerald-500/10 dark:border-emerald-400/10',
      bg: 'from-emerald-500/5 dark:from-emerald-400/10',
      text: 'text-emerald-600/70 dark:text-emerald-400/70'
    },
    danger: {
      border: 'border-red-500/10 dark:border-red-400/10',
      bg: 'from-red-500/5 dark:from-red-400/10',
      text: 'text-red-600/70 dark:text-red-400/70'
    }
  }

  return (
    <Card
      className={cn(
        'border transition-all duration-300',
        'bg-gradient-to-br to-transparent',
        'hover:shadow-lg hover:scale-[1.02]',
        'after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-br',
        'after:opacity-0 hover:after:opacity-100',
        'after:transition-opacity after:-z-10',
        variantClasses[variant].border,
        variantClasses[variant].bg,
        className
      )}
    >
      <CardHeader>
        <CardDescription className='flex items-center justify-between'>
          <span className='font-bold underline'>{title}</span>
          <Icon className={cn('h-3.5 w-3.5', variantClasses[variant].text)} />
        </CardDescription>
        <div className='flex items-baseline gap-1 justify-center'>
          <CurrencyDisplay
            amount={value.toString()}
            variant={variant === 'success' ? 'success' : 'danger'}
            size='md'
          />
        </div>
      </CardHeader>
    </Card>
  )
}
