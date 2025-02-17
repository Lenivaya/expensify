import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { useCallback, useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  Brush,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

type BalanceHistoryItemDto = {
  /**
   * @description Year of the balance record
   * @example 2024
   */
  year: number
  /**
   * @description Month of the balance record (1-12)
   * @example 3
   */
  month: number
  /**
   * @description Total inflows for the period
   * @example 1500.00
   */
  inflow: string
  /**
   * @description Total expenses for the period
   * @example 1200.00
   */
  expense: string
  /**
   * @description Net balance for the period (inflows - expenses)
   * @example 300.00
   */
  balance: string
  /**
   * @description Cumulative balance up to this period
   * @example 2500.00
   */
  cumulativeBalance: string
}

type TimeRange = '1M' | '3M' | '6M' | '1Y' | 'ALL'

interface BalanceHistoryChartProps {
  /**
   * Array of balance history data points
   */
  balanceHistory: BalanceHistoryItemDto[]
  /**
   * Optional CSS class name for styling
   */
  className?: string
  /**
   * Optional height for the chart container
   * @default 400
   */
  height?: number
  /**
   * Optional initial time range to display
   * @default 'ALL'
   */
  defaultTimeRange?: TimeRange
  /**
   * Optional flag to show/hide the time range selector
   * @default true
   */
  showTimeRangeSelector?: boolean
  /**
   * Optional flag to show/hide the zoom controls
   * @default true
   */
  showZoomControls?: boolean
  /**
   * Optional title for the chart
   * @default "Balance History"
   */
  title?: string
}

const TIME_RANGES: { label: string; value: TimeRange }[] = [
  { label: '1 Month', value: '1M' },
  { label: '3 Months', value: '3M' },
  { label: '6 Months', value: '6M' },
  { label: '1 Year', value: '1Y' },
  { label: 'All Time', value: 'ALL' }
]

// Memoized formatters and constants
const MONTHS_MAP = {
  '1M': 1,
  '3M': 3,
  '6M': 6,
  '1Y': 12,
  ALL: Number.POSITIVE_INFINITY
} as const

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

const shortCurrencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
})

const CHART_STYLES = {
  inflow: {
    color: 'var(--chart-1)',
    label: 'Inflow'
  },
  expense: {
    color: 'var(--chart-2)',
    label: 'Expense'
  },
  balance: {
    color: 'var(--chart-3)',
    label: 'Balance'
  }
} as const

/**
 * BalanceHistoryChart component displays financial data over time with interactive features
 * including zooming and time range selection. It shows inflow, expense, and balance trends
 * using a responsive area chart.
 */
export function BalanceHistoryChart({
  balanceHistory,
  className,
  height = 400,
  defaultTimeRange = 'ALL',
  showTimeRangeSelector = true,
  title = 'Balance History'
}: BalanceHistoryChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>(defaultTimeRange)

  // Memoize data transformation
  const chartData = useMemo(() => {
    if (!balanceHistory.length) return []

    return balanceHistory
      .map((item) => ({
        date: new Date(item.year, item.month - 1).getTime(),
        inflow: Number.parseFloat(item.inflow),
        expense: -Number.parseFloat(item.expense),
        balance: Number.parseFloat(item.balance)
      }))
      .sort((a, b) => a.date - b.date)
  }, [balanceHistory])

  // Memoize time range calculations
  const { startIndex, endIndex } = useMemo(() => {
    if (!chartData.length || timeRange === 'ALL') {
      return { startIndex: 0, endIndex: chartData.length - 1 }
    }

    const months = MONTHS_MAP[timeRange]
    const startDate = new Date()
    startDate.setMonth(startDate.getMonth() - months)
    const startTime = startDate.getTime()

    const start = chartData.findIndex((item) => item.date >= startTime)
    return {
      startIndex: Math.max(0, start),
      endIndex: chartData.length - 1
    }
  }, [chartData, timeRange])

  // Memoize formatters
  const formatDate = useCallback((value: number) => {
    return format(value, 'MMM yyyy')
  }, [])

  const formatTooltipDate = useCallback((value: number) => {
    return format(value, 'MMMM yyyy')
  }, [])

  const formatValue = useCallback((value: number) => {
    return shortCurrencyFormatter.format(value)
  }, [])

  const formatTooltipValue = useCallback((value: number) => {
    return currencyFormatter.format(Math.abs(value))
  }, [])

  // Memoize handlers
  const handleTimeRangeChange = useCallback((value: string) => {
    setTimeRange(value as TimeRange)
  }, [])

  if (!chartData.length) {
    return (
      <Card className={cn('p-6', className)}>
        <Skeleton className='h-[400px] w-full' />
      </Card>
    )
  }

  return (
    <Card className={cn('p-6', className)}>
      <div className='mb-6 flex items-center justify-between'>
        <h3 className='text-lg font-semibold'>{title}</h3>
        {showTimeRangeSelector && (
          <Select value={timeRange} onValueChange={handleTimeRangeChange}>
            <SelectTrigger className='w-[140px]'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIME_RANGES.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div style={{ height }}>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart
            data={chartData}
            margin={{
              top: 16,
              right: 30,
              left: 80,
              bottom: 80
            }}
          >
            <defs>
              {Object.entries(CHART_STYLES).map(([key, { color }]) => (
                <linearGradient
                  key={key}
                  id={`${key}Gradient`}
                  x1='0'
                  y1='0'
                  x2='0'
                  y2='1'
                >
                  <stop offset='5%' stopColor={color} stopOpacity={0.8} />
                  <stop offset='95%' stopColor={color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid strokeDasharray='3 3' className='stroke-border/40' />

            <XAxis
              dataKey='date'
              type='number'
              scale='time'
              domain={['auto', 'auto']}
              tickFormatter={formatDate}
              className='text-foreground font-medium'
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: 'var(--border)' }}
              axisLine={{ stroke: 'var(--border)' }}
              dy={16}
            />

            <YAxis
              className='text-foreground font-medium'
              tick={{ fontSize: 12 }}
              tickFormatter={formatValue}
              tickLine={{ stroke: 'var(--border)' }}
              axisLine={{ stroke: 'var(--border)' }}
              dx={-8}
            />

            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null

                return (
                  <div className='rounded-lg border bg-card p-4 shadow-lg transition-all'>
                    <p className='mb-3 font-semibold text-foreground'>
                      {formatTooltipDate(payload[0].payload.date)}
                    </p>
                    {payload.map((item) => {
                      const style =
                        CHART_STYLES[item.name as keyof typeof CHART_STYLES]
                      return (
                        <div
                          key={item.name}
                          className='flex items-center gap-3 py-1.5'
                        >
                          <div
                            className='h-3 w-3 rounded-full'
                            style={{ backgroundColor: style.color }}
                          />
                          <span className='capitalize font-medium text-foreground min-w-[80px]'>
                            {style.label}:
                          </span>
                          <span className='font-semibold text-foreground'>
                            {formatTooltipValue(Number(item.value))}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                )
              }}
              wrapperStyle={{ outline: 'none' }}
            />

            <Legend
              verticalAlign='top'
              height={36}
              content={({ payload }) => (
                <div className='flex items-center justify-center gap-10 mb-2'>
                  {payload?.map((entry) => {
                    const style =
                      CHART_STYLES[entry.value as keyof typeof CHART_STYLES]
                    return (
                      <div
                        key={entry.value}
                        className='flex items-center gap-2.5 transition-opacity hover:opacity-80'
                      >
                        <div
                          className='h-3 w-3 rounded-full'
                          style={{ backgroundColor: style.color }}
                        />
                        <span className='text-sm font-medium text-foreground'>
                          {style.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
            />

            {Object.entries(CHART_STYLES).map(([key, { color }]) => (
              <Area
                key={key}
                type='monotone'
                dataKey={key}
                stroke={color}
                fillOpacity={1}
                fill={`url(#${key}Gradient)`}
                strokeWidth={2.5}
                isAnimationActive={true}
                animationDuration={750}
                animationBegin={0}
              />
            ))}

            <Brush
              dataKey='date'
              height={40}
              fill='var(--background)'
              tickFormatter={formatDate}
              startIndex={startIndex}
              endIndex={endIndex}
              travellerWidth={8}
              className='text-foreground font-medium mt-4'
              stroke='var(--border)'
              y={height - 80}
            >
              <AreaChart>
                <Area
                  type='monotone'
                  dataKey='balance'
                  stroke={CHART_STYLES.balance.color}
                  fill={CHART_STYLES.balance.color}
                  fillOpacity={0.3}
                  strokeWidth={1.5}
                  isAnimationActive={false}
                />
              </AreaChart>
            </Brush>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
