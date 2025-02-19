import { cn } from '@/lib/utils'

interface CurrencyDisplayProps {
  /** The amount to display */
  amount: number
  /** Optional className for styling */
  className?: string
  /** Optional text size class */
  size?: 'sm' | 'md' | 'lg'
  /** Optional color variant */
  variant?: 'primary' | 'success' | 'danger' | 'muted'
  /** Whether to show the plus/minus sign */
  showSign?: boolean
}

/**
 * A component for consistently displaying currency values throughout the application
 *
 * @example
 * ```tsx
 * <CurrencyDisplay amount="1234.56" variant="success" showSign />
 * ```
 */
export function CurrencyDisplay({
  amount,
  className,
  size = 'md',
  variant = 'primary',
  showSign = false
}: CurrencyDisplayProps) {
  const formattedAmount = amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
  const isNegative = Number(amount) < 0

  const sizeClasses = {
    sm: 'text-base',
    md: 'text-2xl',
    lg: 'text-3xl'
  }

  const variantClasses = {
    primary: 'text-primary',
    success: 'text-emerald-600 dark:text-emerald-400',
    danger: 'text-red-600 dark:text-red-400',
    muted: 'text-muted-foreground'
  }

  return (
    <div className={cn('flex items-baseline gap-1', className)}>
      {showSign && !isNegative && (
        <span className={variantClasses[variant]}>+</span>
      )}
      <span className={cn('opacity-60 text-sm', variantClasses[variant])}>
        $
      </span>
      <span
        className={cn(
          'font-bold tracking-tight',
          sizeClasses[size],
          variantClasses[variant]
        )}
      >
        {formattedAmount}
      </span>
    </div>
  )
}
