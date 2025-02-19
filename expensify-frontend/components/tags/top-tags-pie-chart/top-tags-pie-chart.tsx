import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useCallback, useMemo, useState } from 'react'
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip
} from 'recharts'
import {
  COLORS,
  DEFAULT_CHART_HEIGHT,
  DEFAULT_DESCRIPTION,
  DEFAULT_LABEL_MIN_PERCENTAGE,
  DEFAULT_TITLE,
  DEFAULT_VIEW
} from './constants'
import { CustomTooltip } from './custom-tooltip'
import { EmptyState } from './empty-state'
import type { TopTagsPieChartProps } from './types'

/**
 * TopTagsPieChart component displays a pie chart visualization of top tags
 * for expenses and/or inflows. It supports switching between viewing all transactions,
 * only inflows, or only expenses.
 */
export function TopTagsPieChart({
  tagStats,
  height = DEFAULT_CHART_HEIGHT,
  className,
  defaultView = DEFAULT_VIEW,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  showLegend = true,
  showLabels = false,
  labelMinPercentage = DEFAULT_LABEL_MIN_PERCENTAGE
}: TopTagsPieChartProps) {
  const [activeTab, setActiveTab] = useState<string>(defaultView)

  // Memoize chart data calculation
  const chartData = useMemo(() => {
    const filteredStats = tagStats.filter((stat) =>
      activeTab === 'all' ? true : stat.type === activeTab
    )

    return filteredStats.map((stat, index) => ({
      name: stat.tag,
      value: Number.parseFloat(stat.amount.replace(/[^0-9.-]+/g, '')),
      color: COLORS[index % COLORS.length]
    }))
  }, [tagStats, activeTab])

  // Memoize label rendering function
  const renderCustomLabel = useCallback(
    ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      value,
      name
    }: {
      cx: number
      cy: number
      midAngle: number
      innerRadius: number
      outerRadius: number
      value: number
      name: string
    }) => {
      if (!showLabels) {
        return null
      }

      const radian = Math.PI / 180
      const radius = (innerRadius + (outerRadius - innerRadius) * 0.5) * 0.8
      const x = cx + radius * Math.cos(-midAngle * radian)
      const y = cy + radius * Math.sin(-midAngle * radian)

      const total = chartData.reduce((sum, item) => sum + item.value, 0)
      const percent = ((value / total) * 100).toFixed(0)

      return Number(percent) > labelMinPercentage ? (
        <text
          x={x}
          y={y}
          fill='white'
          textAnchor='middle'
          dominantBaseline='central'
          className={cn('font-bold', height > 400 ? 'text-sm' : 'text-xs')}
          style={{
            filter: 'drop-shadow(0px 1px 1px rgb(0 0 0 / 0.3))',
            letterSpacing: '0.02em'
          }}
        >
          {name}
        </text>
      ) : null
    },
    [chartData, height, labelMinPercentage, showLabels]
  )

  return (
    <Card className={cn('space-y-6 p-6', className)}>
      <div className='space-y-2'>
        <h3 className='font-semibold text-lg tracking-tight'>{title}</h3>
        <p className='text-muted-foreground text-sm'>{description}</p>
      </div>

      <Tabs
        defaultValue={defaultView}
        value={activeTab}
        onValueChange={setActiveTab}
        className='space-y-6'
      >
        <TabsList className='grid w-full grid-cols-3 bg-muted/50'>
          <TabsTrigger value='all'>All Tags</TabsTrigger>
          <TabsTrigger value='inflow'>Inflows</TabsTrigger>
          <TabsTrigger value='expense'>Expenses</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className='space-y-6'>
          {chartData.length > 0 ? (
            <ResponsiveContainer
              width='100%'
              height={height}
              className='min-w-[200px]'
            >
              <PieChart
                margin={{
                  top: showLegend ? 20 : 10,
                  right: showLegend ? 120 : 10,
                  bottom: showLegend ? 20 : 10,
                  left: showLegend ? 10 : 10
                }}
              >
                <Pie
                  data={chartData}
                  dataKey='value'
                  nameKey='name'
                  cx='50%'
                  cy='50%'
                  outerRadius='80%'
                  innerRadius='0%'
                  labelLine={false}
                  label={renderCustomLabel}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        index
                      }`}
                      fill={entry.color}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                {showLegend && (
                  <Legend
                    layout='vertical'
                    align='right'
                    verticalAlign='middle'
                    iconType='circle'
                    iconSize={8}
                    formatter={(value, entry) => (
                      <span className='text-sm'>
                        {value}{' '}
                        <span className='ml-1 text-muted-foreground'>
                          ($
                          {entry.payload?.value.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                          )
                        </span>
                      </span>
                    )}
                    wrapperStyle={{
                      paddingLeft: '24px',
                      maxHeight: '70vh',
                      overflowY: 'auto'
                    }}
                  />
                )}
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState />
          )}
        </TabsContent>
      </Tabs>
    </Card>
  )
}
