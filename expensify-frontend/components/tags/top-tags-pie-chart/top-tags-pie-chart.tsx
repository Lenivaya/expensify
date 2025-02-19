'use client'

import {
  TrendingUp,
  PieChartIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  InfoIcon,
  SearchIcon,
  XIcon,
  DollarSignIcon
} from 'lucide-react'
import { useState, useMemo, useCallback } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts'
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
  ChartTooltip,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TopTagsPieChartProps } from './types'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

// Define extended chart data type with fill property
interface ChartDataItem {
  tag: string
  type: string
  amount: number
  percentage: number
  fill: string
}

// Custom legend item component
const CustomLegendItem = ({
  color,
  value,
  tag,
  amount,
  percentage
}: {
  color: string
  value: string
  tag: string
  amount: number
  percentage: number
}) => {
  return (
    <div className='flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors w-full'>
      <div
        className='w-4 h-4 rounded-sm flex-shrink-0'
        style={{ backgroundColor: color }}
      />
      <div className='flex flex-col min-w-0 flex-1'>
        <div className='flex items-center justify-between gap-2'>
          <span className='font-medium text-sm truncate' title={tag}>
            {tag}
          </span>
          <Badge variant='outline' className='text-xs px-1.5 py-0 h-5'>
            {percentage.toFixed(1)}%
          </Badge>
        </div>
        <span className='text-xs text-muted-foreground flex items-center'>
          <DollarSignIcon className='h-3 w-3 mr-0.5' />
          {amount.toLocaleString(undefined, {
            maximumFractionDigits: 0
          })}
        </span>
      </div>
    </div>
  )
}

export function TopTagsPieChart({
  tagStats,
  className,
  defaultView = 'all',
  title = 'Tag Distribution',
  description = 'Overview of your transaction tags',
  showLegend = true,
  labelMinPercentage = 0,
  pieMinPercentage = 0
}: TopTagsPieChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<'all' | 'inflow' | 'expense'>(
    defaultView
  )
  const [isSearching, setIsSearching] = useState(false)

  // Handle search with debounce to prevent jarring UI changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSearching(true)
    const value = e.target.value
    setSearchTerm(value)

    // Reset searching state after a short delay
    setTimeout(() => {
      setIsSearching(false)
    }, 300)
  }

  // Clear search with smooth transition
  const handleClearSearch = () => {
    setIsSearching(true)
    setSearchTerm('')
    setTimeout(() => {
      setIsSearching(false)
    }, 300)
  }

  // Color palette for chart segments
  const colorPalette = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
    'hsl(var(--chart-6, var(--chart-1)))',
    'hsl(var(--chart-7, var(--chart-2)))',
    'hsl(var(--chart-8, var(--chart-3)))',
    'hsl(var(--chart-9, var(--chart-4)))',
    'hsl(var(--chart-10, var(--chart-5)))'
  ]

  // Handle mouse events for pie segments
  const onPieEnter = useCallback((_: any, index: number) => {
    setActiveIndex(index)
  }, [])

  const onPieLeave = useCallback(() => {
    setActiveIndex(undefined)
  }, [])

  // Process chart data with memoization
  const getChartData = useCallback(
    (view: 'all' | 'inflow' | 'expense', search: string) => {
      // First, filter by type
      const filteredByType = tagStats.filter((stat) => {
        if (view === 'all') return true
        // Make sure we match the exact type string
        return stat.type.toLowerCase() === view.toLowerCase()
      })

      // Aggregate amounts for duplicate tags
      const aggregatedData = filteredByType.reduce(
        (acc, stat) => {
          const key = stat.tag.toLowerCase()
          if (!acc[key]) {
            acc[key] = { tag: stat.tag, type: stat.type, amount: stat.amount }
          } else {
            acc[key].amount += stat.amount
          }
          return acc
        },
        {} as Record<string, { tag: string; type: string; amount: number }>
      )

      // Convert to array and sort by amount
      let sortedData = Object.values(aggregatedData).sort(
        (a, b) => b.amount - a.amount
      )

      // Apply search filter if provided
      if (search) {
        sortedData = sortedData.filter((item) =>
          item.tag.toLowerCase().includes(search.toLowerCase())
        )
      }

      // Apply colors from palette
      const dataWithFill = sortedData.map((item, index) => ({
        ...item,
        fill: colorPalette[index % colorPalette.length]
      }))

      // Calculate percentages
      const total = dataWithFill.reduce((sum, item) => sum + item.amount, 0)
      return dataWithFill
        .map((item) => ({
          ...item,
          percentage: (item.amount / total) * 100
        }))
        .filter(
          (item) => item.percentage >= pieMinPercentage
        ) as ChartDataItem[]
    },
    [tagStats, pieMinPercentage, colorPalette]
  )

  // Memoize chart data to prevent unnecessary recalculations
  const chartData = useMemo(
    () => getChartData(activeTab, searchTerm),
    [activeTab, searchTerm, getChartData]
  )

  // Only show in legend if percentage is above threshold
  const legendData = useMemo<ChartDataItem[]>(() => chartData, [chartData])

  // Create chart configuration
  const chartConfig = useMemo(
    () =>
      chartData.reduce(
        (config, stat) => {
          if (!config[stat.tag]) {
            config[stat.tag] = {
              label: stat.tag,
              color: stat.fill
            }
          }
          return config
        },
        { value: { label: 'Amount' } } as ChartConfig
      ),
    [chartData]
  )

  // Custom active shape for pie chart
  const renderActiveShape = (props: any) => {
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percentage
    } = props

    return (
      <g>
        <Tooltip open={true}>
          <TooltipContent
            side='right'
            className='bg-popover/95 backdrop-blur-sm border border-border/50 shadow-lg'
          >
            <div className='p-2 space-y-1'>
              <p className='font-medium'>{payload.tag}</p>
              <p className='text-sm text-muted-foreground'>
                $
                {payload.amount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </p>
              <Badge variant='outline' className='mt-1'>
                {percentage.toFixed(1)}%
              </Badge>
            </div>
          </TooltipContent>
        </Tooltip>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 6}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={0.8}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={innerRadius - 4}
          outerRadius={innerRadius - 1}
          fill={fill}
        />
      </g>
    )
  }

  // Custom tooltip content
  const renderTooltipContent = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null
    const data = payload[0].payload

    return (
      <div className='rounded-lg bg-background/95 shadow-md backdrop-blur-sm p-2 border border-border/50'>
        <p className='text-sm font-medium'>{data.tag}</p>
        <div className='flex items-center justify-between gap-2 mt-1'>
          <span className='text-sm text-muted-foreground'>
            $
            {data.amount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </span>
          <Badge variant='secondary' className='text-xs'>
            {data.percentage.toFixed(1)}%
          </Badge>
        </div>
      </div>
    )
  }

  // Get the appropriate icon for the tab
  const getTabIcon = (tab: 'all' | 'inflow' | 'expense') => {
    switch (tab) {
      case 'inflow':
        return <ArrowUpIcon className='h-3.5 w-3.5 mr-1 text-emerald-500' />
      case 'expense':
        return <ArrowDownIcon className='h-3.5 w-3.5 mr-1 text-red-500' />
      default:
        return <PieChartIcon className='h-3.5 w-3.5 mr-1 text-primary/70' />
    }
  }

  // Handle empty state
  const isEmpty = chartData.length === 0

  // Custom legend content renderer
  const renderCustomLegendContent = () => {
    return (
      <div className='w-full px-2 py-1 flex flex-col items-center'>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2'>
          {legendData.map((entry, index) => (
            <CustomLegendItem
              key={`legend-item-${index}`}
              color={entry.fill}
              value={entry.tag}
              tag={entry.tag}
              amount={entry.amount}
              percentage={entry.percentage}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <EnhancedCard
      className={cn('h-full flex flex-col overflow-hidden', className)}
      hoverIntensity='high'
    >
      <EnhancedCardHeader className='items-center pb-0 space-y-1 pt-4'>
        <div className='flex items-center gap-2'>
          <PieChartIcon className='h-5 w-5 text-primary/70' />
          <EnhancedCardTitle className='text-xl'>{title}</EnhancedCardTitle>
        </div>
        <EnhancedCardDescription>{description}</EnhancedCardDescription>
      </EnhancedCardHeader>

      <EnhancedCardContent className='flex-1 pb-0 pt-2 px-3'>
        <Tabs
          defaultValue={defaultView}
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as 'all' | 'inflow' | 'expense')
          }
          className='h-full'
        >
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2'>
            <TabsList className='h-8'>
              <TabsTrigger value='all' className='flex items-center text-xs'>
                {getTabIcon('all')}
                All
              </TabsTrigger>
              <TabsTrigger value='inflow' className='flex items-center text-xs'>
                {getTabIcon('inflow')}
                Inflows
              </TabsTrigger>
              <TabsTrigger
                value='expense'
                className='flex items-center text-xs'
              >
                {getTabIcon('expense')}
                Expenses
              </TabsTrigger>
            </TabsList>

            <div className='relative w-full sm:w-auto sm:max-w-[180px]'>
              <SearchIcon className='absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground/70' />
              <Input
                placeholder='Search tags...'
                value={searchTerm}
                onChange={handleSearchChange}
                className='pl-7 h-8 text-xs'
              />
              {searchTerm && (
                <Button
                  variant='ghost'
                  size='icon'
                  className='absolute right-1 top-1 h-6 w-6'
                  onClick={handleClearSearch}
                >
                  <XIcon className='h-3 w-3' />
                </Button>
              )}
            </div>
          </div>

          <TabsContent
            value={activeTab}
            className='mt-0 h-[calc(100%-40px)] data-[state=inactive]:hidden'
          >
            <div className='flex flex-col h-full'>
              {/* Chart Section - Fixed height container */}
              <div className='h-[220px] transition-all duration-300 relative'>
                <div
                  className={cn(
                    'absolute inset-0 transition-opacity duration-300',
                    isSearching ? 'opacity-50' : 'opacity-100'
                  )}
                >
                  {isEmpty ? (
                    <div className='h-full w-full flex flex-col items-center justify-center text-center p-4'>
                      <div className='rounded-full bg-muted p-3 mb-3'>
                        <PieChartIcon className='h-6 w-6 text-muted-foreground' />
                      </div>
                      <h3 className='text-lg font-medium'>No data available</h3>
                      <p className='text-sm text-muted-foreground mt-1 max-w-[250px]'>
                        {searchTerm
                          ? `No tags matching "${searchTerm}" found in ${activeTab} transactions.`
                          : `No tags found for ${activeTab} transactions.`}
                      </p>
                      {searchTerm && (
                        <Button
                          variant='outline'
                          size='sm'
                          className='mt-4'
                          onClick={handleClearSearch}
                        >
                          Clear search
                        </Button>
                      )}
                    </div>
                  ) : (
                    <ChartContainer
                      config={chartConfig}
                      className='h-full w-full flex items-center justify-center'
                    >
                      <ResponsiveContainer width='100%' height='100%'>
                        <PieChart>
                          <ChartTooltip
                            cursor={false}
                            content={renderTooltipContent}
                          />
                          <Pie
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={chartData}
                            dataKey='amount'
                            nameKey='tag'
                            innerRadius='60%'
                            outerRadius='75%'
                            paddingAngle={2}
                            onMouseEnter={onPieEnter}
                            onMouseLeave={onPieLeave}
                          >
                            {chartData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={entry.fill}
                                stroke='transparent'
                                className='transition-opacity duration-200 hover:opacity-80'
                              />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  )}
                </div>
              </div>

              {/* Legend Section - Fixed height */}
              <div className='mt-2 border-t border-border/30 pt-2 flex-shrink-0 flex flex-col h-[180px] transition-all duration-300'>
                <div
                  className={cn(
                    'h-full transition-opacity duration-300',
                    isSearching ? 'opacity-50' : 'opacity-100'
                  )}
                >
                  {showLegend && legendData.length > 0 ? (
                    <>
                      <div className='flex items-center justify-between px-3 mb-1 sticky top-0 bg-card z-10'>
                        <h4 className='text-xs font-medium text-muted-foreground'>
                          Legend
                        </h4>
                        <span className='text-xs text-muted-foreground/70'>
                          All {chartData.length} tags
                        </span>
                      </div>
                      <div className='overflow-y-auto flex-1'>
                        {renderCustomLegendContent()}
                      </div>
                    </>
                  ) : (
                    <div className='flex items-center justify-center h-full text-muted-foreground text-sm'>
                      {searchTerm
                        ? 'No matching tags to display'
                        : 'No tags to display'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </EnhancedCardContent>

      <EnhancedCardFooter className='flex-col gap-1 text-xs pt-1 pb-3'>
        <div className='flex items-center gap-2 font-medium leading-none'>
          <TrendingUp className='h-3.5 w-3.5 text-primary/70' />
          <span>Transaction Overview</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='ghost' size='icon' className='h-5 w-5 ml-auto'>
                <InfoIcon className='h-3 w-3 text-muted-foreground/70' />
              </Button>
            </TooltipTrigger>
            <TooltipContent side='left' className='max-w-[250px]'>
              This chart shows the distribution of your transaction tags by
              amount.
              {searchTerm && (
                <p className='mt-1'>Currently filtering by: "{searchTerm}"</p>
              )}
            </TooltipContent>
          </Tooltip>
        </div>
        <div className='leading-none text-muted-foreground text-xs'>
          Showing distribution of {activeTab === 'all' ? 'all' : activeTab}{' '}
          transaction tags{' '}
          {chartData.length > 0 && `(${chartData.length} tags)`}
        </div>
      </EnhancedCardFooter>
    </EnhancedCard>
  )
}
