import { Button } from '@/components/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'
import { InfoIcon } from 'lucide-react'

/**
 * A button component that displays statistical information on hover
 *
 * @description
 * Renders an information button with a hover card that explains the statistics section.
 * The button uses a ghost variant with a muted info icon, and reveals additional
 * information when hovered over.
 *
 * Features:
 * - Hover card with delayed opening (200ms)
 * - Glassmorphism design with backdrop blur
 * - Accessible button with icon
 * - Smooth hover transitions
 * - Right-aligned content
 *
 * @example
 * ```tsx
 * <StatsInfoButton />
 * ```
 */
export function StatsInfoButton() {
  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='h-8 w-8 hover:bg-secondary/20 transition-colors'
        >
          <InfoIcon className='h-4 w-4 text-muted-foreground' />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent
        align='end'
        className='w-[280px] backdrop-blur-sm bg-popover/95'
      >
        <p className='text-sm'>
          Average values are calculated based on your transaction history
        </p>
      </HoverCardContent>
    </HoverCard>
  )
}
