import { memo } from 'react'
import type { ChartDataItem } from './types'

interface CustomTooltipProps {
  active?: boolean
  payload?: {
    payload: ChartDataItem
  }[]
}

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
