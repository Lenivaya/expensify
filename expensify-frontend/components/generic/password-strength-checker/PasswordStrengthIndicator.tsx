import { cn } from '@/lib/utils'
import type {
  PasswordStrength,
  StrengthMapType,
  StyleConfig
} from './types'
import { cva } from 'class-variance-authority'

const strengthVariants = cva('', {
  variants: {
    variant: {
      veryWeak: 'bg-destructive/50',
      weak: 'bg-destructive',
      moderate: 'bg-yellow-500',
      strong: 'bg-emerald-500',
      veryStrong: 'bg-emerald-600'
    }
  },
  defaultVariants: {
    variant: 'veryWeak'
  }
})

const labelVariants = cva('font-medium text-xs', {
  variants: {
    variant: {
      veryWeak: 'text-destructive',
      weak: 'text-destructive',
      moderate: 'text-yellow-600 dark:text-yellow-500',
      strong: 'text-emerald-600 dark:text-emerald-500',
      veryStrong: 'text-emerald-700 dark:text-emerald-600'
    }
  },
  defaultVariants: {
    variant: 'veryWeak'
  }
})

export const DEFAULT_STRENGTH_MAP: StrengthMapType = {
  veryWeak: {
    label: 'Very Weak',
    percentage: 20
  },
  weak: {
    label: 'Weak',
    percentage: 40
  },
  moderate: {
    label: 'Moderate',
    percentage: 60
  },
  strong: {
    label: 'Strong',
    percentage: 80
  },
  veryStrong: {
    label: 'Very Strong',
    percentage: 100
  }
}

interface PasswordStrengthIndicatorProps {
  strength: PasswordStrength
  strengthMap?: Partial<StrengthMapType>
  styleConfig?: StyleConfig
  className?: string
}

/**
 * PasswordStrengthIndicator is a component that displays the strength of a password.
 */
export function PasswordStrengthIndicator({
  strength,
  strengthMap = {},
  styleConfig = {},
  className
}: PasswordStrengthIndicatorProps) {
  const mergedStrengthMap = {
    ...DEFAULT_STRENGTH_MAP,
    ...strengthMap
  }

  const { label, percentage } = mergedStrengthMap[strength]

  return (
    <div
      className={cn(
        'space-y-2',
        className,
        styleConfig.containerClassName
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            'text-muted-foreground text-xs',
            styleConfig.labelClassName
          )}
        >
          Password Strength
        </span>
        <span
          className={cn(
            labelVariants({ variant: strength }),
            styleConfig.strengthLabelClassName
          )}
        >
          {label}
        </span>
      </div>

      <div
        className={cn(
          'h-1.5 w-full overflow-hidden rounded-full bg-secondary/20',
          styleConfig.progressBarClassName
        )}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300 ease-out',
            strengthVariants({ variant: strength })
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {styleConfig.showPercentage && (
        <div className="flex justify-end">
          <span className="text-[10px] text-muted-foreground/70 tabular-nums">
            {percentage}%
          </span>
        </div>
      )}
    </div>
  )
}
