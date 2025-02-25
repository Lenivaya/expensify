'use client'

import {
  EnhancedCard,
  EnhancedCardContent,
  EnhancedCardDescription,
  EnhancedCardFooter,
  EnhancedCardHeader,
  EnhancedCardTitle
} from '@/components/ui/enhanced-card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
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
import { LineChart, TrendingDown, TrendingUp } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState, useRef } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts'

// Types
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

type ChartDataItem = {
  date: string
  inflow: number
  expense: number
  balance: number
}

// Define a type for tracking visible data series
type VisibleSeries = {
  balance: boolean
  inflow: boolean
  expense: boolean
}

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
   * Optional flag to show/hide the legend
   * @default true
   */
  showLegend?: boolean
  /**
   * Optional title for the chart
   * @default "Balance History"
   */
  title?: string
  /**
   * Optional description for the chart
   * @default "Track your financial trends over time"
   */
  description?: string
}

// Constants
const TIME_RANGES: { label: string; value: TimeRange }[] = [
  { label: '1 Month', value: '1M' },
  { label: '3 Months', value: '3M' },
  { label: '6 Months', value: '6M' },
  { label: '1 Year', value: '1Y' },
  { label: 'All Time', value: 'ALL' }
]

const MONTHS_MAP = {
  '1M': 1,
  '3M': 3,
  '6M': 6,
  '1Y': 12,
  ALL: Number.POSITIVE_INFINITY
} as const

// Formatters
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  signDisplay: 'exceptZero'
})

const compactCurrencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1
})

const fullCurrencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

// Chart configuration
const chartConfig = {
  balance: {
    label: 'Balance',
    color: 'hsl(47, 82%, 47%)' // Golden yellow
  },
  inflow: {
    label: 'Inflow',
    color: 'hsl(142, 71%, 45%)' // Bright green
  },
  expense: {
    label: 'Expense',
    color: 'hsl(346, 84%, 61%)' // Bright red
  }
} satisfies ChartConfig

// Sub-components
interface TimeRangeSelectorProps {
  value: TimeRange
  onChange: (value: TimeRange) => void
  disabled?: boolean
}

function TimeRangeSelector({
  value,
  onChange,
  disabled = false
}: TimeRangeSelectorProps) {
  return (
    <div className='absolute right-4 top-4'>
      <Select
        value={value}
        onValueChange={(value) => onChange(value as TimeRange)}
        disabled={disabled}
      >
        <SelectTrigger
          className={cn('w-[160px] h-8 text-xs', disabled && 'opacity-50')}
          aria-label='Select time range'
        >
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
    </div>
  )
}

interface TrendIndicatorProps {
  percentage: number
}

function TrendIndicator({ percentage }: TrendIndicatorProps) {
  const isPositive = percentage > 0
  const formattedPercentage = Math.abs(percentage).toFixed(1)

  return (
    <div className='flex items-center gap-1'>
      {isPositive ? (
        <>
          <TrendingUp className='h-3 w-3 text-green-500' aria-hidden='true' />
          <span>Up {formattedPercentage}%</span>
        </>
      ) : (
        <>
          <TrendingDown className='h-3 w-3 text-red-500' aria-hidden='true' />
          <span>Down {formattedPercentage}%</span>
        </>
      )}
      <span className='ml-1'>this month</span>
    </div>
  )
}

interface ChartGradientsProps {
  colors: {
    balance: string
    inflow: string
    expense: string
  }
}

function ChartGradients({ colors }: ChartGradientsProps) {
  return (
    <defs>
      <linearGradient id='fillBalance' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='5%' stopColor={colors.balance} stopOpacity={0.5} />
        <stop offset='95%' stopColor={colors.balance} stopOpacity={0.1} />
      </linearGradient>
      <linearGradient id='fillInflow' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='5%' stopColor={colors.inflow} stopOpacity={0.5} />
        <stop offset='95%' stopColor={colors.inflow} stopOpacity={0.1} />
      </linearGradient>
      <linearGradient id='fillExpense' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='5%' stopColor={colors.expense} stopOpacity={0.5} />
        <stop offset='95%' stopColor={colors.expense} stopOpacity={0.1} />
      </linearGradient>
    </defs>
  )
}

/**
 * Custom hook to handle window resize with debounce
 */
function useWindowSize(delay = 250) {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  })

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    function handleResize() {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        })
      }, delay)
    }

    window.addEventListener('resize', handleResize)

    // Initial size
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [delay])

  return windowSize
}

/**
 * Custom hook to transform and filter balance history data
 */
function useChartData(
  balanceHistory: BalanceHistoryItemDto[],
  timeRange: TimeRange
) {
  // Transform raw data to chart format
  const chartData = useMemo<ChartDataItem[]>(() => {
    if (!balanceHistory.length) return []

    return balanceHistory
      .map((item) => ({
        date: format(new Date(item.year, item.month - 1), 'yyyy-MM-dd'),
        inflow: Number.parseFloat(item.inflow),
        expense: -Number.parseFloat(item.expense), // Negative for visual representation
        balance: Number.parseFloat(item.cumulativeBalance)
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [balanceHistory])

  // Filter data based on time range
  const filteredData = useMemo(() => {
    if (!chartData.length || timeRange === 'ALL') {
      return chartData
    }

    const months = MONTHS_MAP[timeRange]
    const startDate = new Date()
    startDate.setMonth(startDate.getMonth() - months)

    return chartData.filter((item) => new Date(item.date) >= startDate)
  }, [chartData, timeRange])

  // Calculate trend percentage
  const trendPercentage = useMemo(() => {
    if (chartData.length < 2) return 0

    const lastTwoMonths = chartData.slice(-2)
    const [prevMonth, currentMonth] = lastTwoMonths

    // Avoid division by zero
    if (prevMonth.balance === 0) {
      return currentMonth.balance > 0
        ? 100
        : currentMonth.balance < 0
          ? -100
          : 0
    }

    return (
      ((currentMonth.balance - prevMonth.balance) /
        Math.abs(prevMonth.balance)) *
      100
    )
  }, [chartData])

  return {
    chartData,
    filteredData,
    trendPercentage,
    hasData: chartData.length > 0
  }
}

/**
 * Custom legend component that supports toggling visibility of chart elements
 */
interface CustomLegendProps {
  payload?: Array<{
    value: string
    type: string
    id: string
    color: string
    payload: {
      stroke: string
      fill: string
      dataKey: string
    }
  }>
  visibleSeries: VisibleSeries
  onToggle: (dataKey: keyof VisibleSeries) => void
}

function CustomLegend({ payload, visibleSeries, onToggle }: CustomLegendProps) {
  if (!payload || payload.length === 0) return null

  return (
    <ul className='flex flex-wrap justify-center gap-4 pt-2 pb-1'>
      {payload.map((entry, index) => {
        const dataKey = entry.payload.dataKey as keyof VisibleSeries
        const isVisible = visibleSeries[dataKey]

        return (
          <li
            key={`legend-item-${index}`}
            className={cn(
              'flex items-center gap-2 cursor-pointer select-none transition-opacity',
              !isVisible && 'opacity-50'
            )}
            onClick={() => onToggle(dataKey)}
            role='button'
            aria-pressed={isVisible}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onToggle(dataKey)
              }
            }}
          >
            <div
              className='w-3 h-3 rounded-sm'
              style={{ backgroundColor: entry.color }}
            />
            <span className='text-xs font-medium'>{entry.value}</span>
          </li>
        )
      })}
    </ul>
  )
}

/**
 * BalanceHistoryChart component displays financial data over time with interactive features
 * including time range selection. It shows inflow, expense, and balance trends
 * using a responsive area chart.
 */
export function BalanceHistoryChart({
  balanceHistory,
  className,
  height = 400,
  defaultTimeRange = 'ALL',
  showTimeRangeSelector = true,
  showLegend = true,
  title = 'Balance History',
  description = 'Track your financial trends over time'
}: BalanceHistoryChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>(defaultTimeRange)
  const { width: windowWidth, height: windowHeight } = useWindowSize()
  const { filteredData, trendPercentage, hasData } = useChartData(
    balanceHistory,
    timeRange
  )

  // State to track which data series are visible
  const [visibleSeries, setVisibleSeries] = useState<VisibleSeries>({
    balance: true,
    inflow: true,
    expense: true
  })

  // Toggle visibility of a data series
  const toggleSeriesVisibility = useCallback((dataKey: keyof VisibleSeries) => {
    setVisibleSeries((prev) => ({
      ...prev,
      [dataKey]: !prev[dataKey]
    }))
  }, [])

  // Calculate responsive height based on window size
  const chartHeight = useMemo(() => {
    // Base height calculation
    const baseHeight = Math.min(height, windowHeight * 0.6)
    // Adjust for mobile
    if (windowWidth < 640) {
      return Math.min(baseHeight, 300)
    }
    return baseHeight
  }, [height, windowWidth, windowHeight])

  // Format date for display
  const formatDate = useCallback((dateString: string, isMobile = false) => {
    const date = new Date(dateString)
    return isMobile ? format(date, 'MMM') : format(date, 'MMM d')
  }, [])

  // Handle time range change
  const handleTimeRangeChange = useCallback((value: TimeRange) => {
    setTimeRange(value)
  }, [])

  // Empty state
  if (!hasData) {
    return (
      <EnhancedCard
        className={cn('w-full h-full', className)}
        hoverIntensity='high'
      >
        <EnhancedCardHeader className='items-center pb-0 space-y-1 pt-4'>
          <div className='flex items-center gap-2'>
            <LineChart className='h-5 w-5 text-primary/70' aria-hidden='true' />
            <EnhancedCardTitle>{title}</EnhancedCardTitle>
          </div>
          <EnhancedCardDescription>{description}</EnhancedCardDescription>
          {showTimeRangeSelector && (
            <TimeRangeSelector
              value={defaultTimeRange}
              onChange={() => {}}
              disabled={true}
            />
          )}
        </EnhancedCardHeader>
        <EnhancedCardContent className='flex-1 px-4 pb-3 pt-2'>
          <Skeleton
            className='w-full h-[300px] sm:h-[400px]'
            aria-label='Loading chart data'
          />
        </EnhancedCardContent>
      </EnhancedCard>
    )
  }

  // Date range for display
  const dateRangeText =
    filteredData.length > 0
      ? `${format(new Date(filteredData[0].date), 'MMM yyyy')} - ${format(new Date(filteredData[filteredData.length - 1].date), 'MMM yyyy')}`
      : ''

  return (
    <EnhancedCard
      className={cn('w-full h-full', className)}
      hoverIntensity='high'
    >
      <EnhancedCardHeader className='items-center pb-0 space-y-1 pt-4'>
        <div className='flex items-center gap-2'>
          <LineChart className='h-5 w-5 text-primary/70' aria-hidden='true' />
          <EnhancedCardTitle>{title}</EnhancedCardTitle>
        </div>
        <EnhancedCardDescription>{description}</EnhancedCardDescription>
        {showTimeRangeSelector && (
          <TimeRangeSelector
            value={timeRange}
            onChange={handleTimeRangeChange}
          />
        )}
      </EnhancedCardHeader>

      <EnhancedCardContent className='flex-1 px-4 pb-3 pt-2'>
        {/*
          Chart Container with area fills
          - Balance (golden) shows cumulative balance over time
          - Inflow (green) shows positive cash flow
          - Expense (red) shows negative cash flow (displayed as negative values)
          - All areas have gradient fills for better visual appeal
        */}
        <ChartContainer
          config={chartConfig}
          className='w-full'
          style={{ height: chartHeight }}
        >
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart
              data={filteredData}
              margin={{
                top: 5,
                right: 5,
                left: 5,
                bottom: 5
              }}
              aria-label={`Balance history chart from ${dateRangeText}`}
            >
              <ChartGradients
                colors={{
                  balance: chartConfig.balance.color,
                  inflow: chartConfig.inflow.color,
                  expense: chartConfig.expense.color
                }}
              />
              <CartesianGrid vertical={false} className='stroke-muted/20' />
              <XAxis
                dataKey='date'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                interval='preserveStartEnd'
                tickFormatter={(value) => formatDate(value, windowWidth < 640)}
                className='text-xs text-muted-foreground/70'
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={55}
                tickFormatter={(value) =>
                  compactCurrencyFormatter.format(value)
                }
                className='text-xs text-muted-foreground/70'
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value: any) => {
                      if (typeof value === 'number') {
                        return fullCurrencyFormatter.format(value)
                      }
                      return value?.toString() || ''
                    }}
                    labelFormatter={(value) => {
                      return format(new Date(value), 'MMMM d, yyyy')
                    }}
                    indicator='dot'
                  />
                }
              />
              <Area
                type='monotone'
                dataKey='balance'
                name={chartConfig.balance.label}
                stroke={chartConfig.balance.color}
                fill='url(#fillBalance)'
                fillOpacity={1}
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, strokeWidth: 1 }}
                isAnimationActive={true}
                connectNulls={true}
                animationDuration={1000}
                animationEasing='ease-out'
                hide={!visibleSeries.balance}
              />
              <Area
                type='monotone'
                dataKey='inflow'
                name={chartConfig.inflow.label}
                stroke={chartConfig.inflow.color}
                fill='url(#fillInflow)'
                fillOpacity={1}
                strokeWidth={1.5}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 1 }}
                isAnimationActive={true}
                connectNulls={true}
                animationDuration={800}
                animationEasing='ease-out'
                hide={!visibleSeries.inflow}
              />
              <Area
                type='monotone'
                dataKey='expense'
                name={chartConfig.expense.label}
                stroke={chartConfig.expense.color}
                fill='url(#fillExpense)'
                fillOpacity={1}
                strokeWidth={1.5}
                strokeDasharray='3 3'
                dot={false}
                activeDot={{ r: 4, strokeWidth: 1 }}
                isAnimationActive={true}
                connectNulls={true}
                animationDuration={800}
                animationEasing='ease-out'
                hide={!visibleSeries.expense}
              />
              {showLegend && (
                <ChartLegend
                  verticalAlign='bottom'
                  content={
                    <CustomLegend
                      visibleSeries={visibleSeries}
                      onToggle={toggleSeriesVisibility}
                    />
                  }
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </EnhancedCardContent>

      <EnhancedCardFooter className='flex-col gap-1 text-xs pt-1 pb-3'>
        <div className='flex items-center gap-2 text-xs text-muted-foreground'>
          <TrendIndicator percentage={trendPercentage} />
          <span aria-hidden='true'>•</span>
          <span className='hidden sm:inline'>{dateRangeText}</span>
        </div>
      </EnhancedCardFooter>
    </EnhancedCard>
  )
}
