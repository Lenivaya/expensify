import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card'

interface EnhancedCardProps extends React.ComponentProps<typeof Card> {
  /**
   * Whether to enable the green flash hover effect
   * @default true
   */
  enableHoverEffect?: boolean
  /**
   * Whether to apply the glass/blur effect
   * @default true
   */
  glassEffect?: boolean
  /**
   * Intensity of the hover effect
   * @default 'medium'
   */
  hoverIntensity?: 'low' | 'medium' | 'high'
}

/**
 * Enhanced Card component with consistent styling for financial components
 * Features:
 * - Optional green flash hover effect
 * - Glass/blur effect
 * - Consistent border and shadow styling
 * - Dark mode support
 */
function EnhancedCard({
  className,
  enableHoverEffect = true,
  glassEffect = false,
  hoverIntensity = 'medium',
  children,
  ...props
}: EnhancedCardProps) {
  // Define hover effect styles based on intensity
  const hoverStyles = {
    low: 'hover:shadow-md hover:border-emerald-500/20 hover:shadow-emerald-500/5',
    medium:
      'hover:shadow-md hover:border-emerald-500/40 hover:shadow-emerald-500/10 hover:border-[1.5px]',
    high: 'hover:shadow-xl hover:border-emerald-500/70 hover:shadow-emerald-500/30 hover:border-2 hover:-translate-y-[1px]'
  }

  return (
    <Card
      className={cn(
        'w-full overflow-hidden',
        // Glass effect
        glassEffect && 'bg-card/95 backdrop-blur-sm',
        // Border and shadow
        'border-border/60 shadow-sm transition-all duration-300',
        // Hover effect
        enableHoverEffect && hoverStyles[hoverIntensity],
        // Dark mode
        'dark:bg-card/80 dark:border-border/40',
        className
      )}
      {...props}
    >
      {children}
    </Card>
  )
}

/**
 * Enhanced Card Header with consistent styling
 */
function EnhancedCardHeader({
  className,
  ...props
}: React.ComponentProps<typeof CardHeader>) {
  return <CardHeader className={cn('pb-3 space-y-1', className)} {...props} />
}

/**
 * Enhanced Card Title with consistent styling
 */
function EnhancedCardTitle({
  className,
  ...props
}: React.ComponentProps<typeof CardTitle>) {
  return (
    <CardTitle
      className={cn(
        'text-xl font-bold tracking-tight text-foreground',
        className
      )}
      {...props}
    />
  )
}

/**
 * Enhanced Card Description with consistent styling
 */
function EnhancedCardDescription({
  className,
  ...props
}: React.ComponentProps<typeof CardDescription>) {
  return (
    <CardDescription
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

/**
 * Enhanced Card Content with consistent styling
 */
function EnhancedCardContent({
  className,
  ...props
}: React.ComponentProps<typeof CardContent>) {
  return (
    <CardContent className={cn('space-y-4 px-4 pb-4', className)} {...props} />
  )
}

/**
 * Enhanced Card Footer with consistent styling
 */
function EnhancedCardFooter({
  className,
  ...props
}: React.ComponentProps<typeof CardFooter>) {
  return (
    <CardFooter
      className={cn('flex-col gap-1.5 text-sm pt-2', className)}
      {...props}
    />
  )
}

export {
  EnhancedCard,
  EnhancedCardHeader,
  EnhancedCardTitle,
  EnhancedCardDescription,
  EnhancedCardContent,
  EnhancedCardFooter
}
