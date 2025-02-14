export type TagSummaryItemDto = {
  /**
   * @description Tag name
   * @example groceries
   */
  tag: string
  /**
   * @description Total amount for this tag
   * @example 500.00
   */
  amount: string
  /**
   * @description Type of transaction
   * @example expense
   * @enum {string}
   */
  type: 'inflow' | 'expense'
}

export interface TopTagsPieChartProps {
  tagStats: TagSummaryItemDto[]
  height?: number
  className?: string
  defaultView?: 'all' | 'inflow' | 'expense'
  title?: string
  description?: string
  showLegend?: boolean
  showLabels?: boolean
  labelMinPercentage?: number
}

export interface ChartDataItem {
  name: string
  value: number
  color: string
}
