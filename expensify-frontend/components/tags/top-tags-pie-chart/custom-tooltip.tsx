import { memo } from 'react'
import type { ChartDataItem } from './types'

/**
 * Props for the CustomTooltip component
 * @interface CustomTooltipProps
 * @property {boolean} [active] - Whether the tooltip is currently active/visible
 * @property {Array<{payload: ChartDataItem}>} [payload] - Data payload for the tooltip content
 */
interface CustomTooltipProps {
  active?: boolean
  payload?: {
    payload: ChartDataItem
  }[]
}

/**
 * A custom tooltip component for the pie chart
 *
 * @description
 * This component renders a styled tooltip for the pie chart segments.
 * It displays the segment name and formatted monetary value with a
 * modern glassmorphism design.
 *
 * Features:
 * - Glassmorphism design with backdrop blur
 * - Formatted currency display
 * - Responsive layout
 * - Memoized for performance
 * - Null rendering when inactive
 *
 * Visual Elements:
 * - Segment name in semibold
 * - Currency value in muted color
 * - Rounded corners with border
 * - Blurred background
 * - Drop shadow
 *
 * @example
 * ```tsx
 * <CustomTooltip
 *   active={true}
 *   payload={[{
 *     payload: {
 *       name: "Groceries",
 *       value: 123.45,
 *       color: "#3B82F6"
 *     }
 *   }]}
 * />
 * ```
 */
export const CustomTooltip = memo(function CustomTooltip({
  active,
  payload
}: CustomTooltipProps) {
  if (!active || !payload?.length) {
    return null
  }

  const data = payload[0].payload
  return (
    <div className='rounded-lg border bg-background/95 px-3 py-2 shadow-md backdrop-blur'>
      <p className='font-semibold text-sm'>{data.name}</p>
      <p className='font-medium text-muted-foreground text-sm'>
        $
        {data.value.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}
      </p>
    </div>
  )
})
