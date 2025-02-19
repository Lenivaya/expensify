import { cn } from '@/lib/utils'
import { Card, CardHeader, CardDescription, CardTitle } from './card'
import type { LucideIcon } from 'lucide-react'
import { CurrencyDisplay } from './currency-display'

interface StatsCardProps {
  /** Title of the stats card */
  title: string
  /** Optional subtitle */
  subtitle?: string
  /** Value to display */
  value: string | number
  /** Primary icon to display */
  icon: LucideIcon
  /** Optional secondary icon */
  secondaryIcon?: LucideIcon
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
 *   title="Average Monthly Inflow"
 *   subtitle="Monthly average"
 *   value="1234.56"
 *   icon={TrendingUpIcon}
 *   secondaryIcon={CalendarIcon}
 *   variant="success"
 * />
 * ```
 */
export function StatsCard({
  title,
  subtitle,
  value,
  icon: Icon,
  secondaryIcon: SecondaryIcon,
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
      <CardHeader className='p-4 pb-3 space-y-2'>
        <CardDescription className='flex items-center justify-between'>
          <div className='space-y-0.5'>
            <span className='font-medium text-sm text-foreground/90'>
              {title}
            </span>
            {subtitle && (
              <p className='text-[0.7rem] text-muted-foreground/60'>
                {subtitle}
              </p>
            )}
          </div>
          <div className='flex items-center gap-1'>
            {SecondaryIcon && (
              <SecondaryIcon
                className={cn(
                  'h-3 w-3',
                  variantClasses[variant].text,
                  'opacity-60'
                )}
              />
            )}
            <Icon className={cn('h-3 w-3', variantClasses[variant].text)} />
          </div>
        </CardDescription>
        <div className='flex items-baseline justify-center'>
          <CurrencyDisplay
            amount={Number(value)}
            variant={variant === 'success' ? 'success' : 'danger'}
            size='sm'
          />
        </div>
      </CardHeader>
    </Card>
  )
}
