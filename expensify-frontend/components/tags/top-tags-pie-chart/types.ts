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
  amount: number
  /**
   * @description Type of transaction
   * @example expense
   * @enum {string}
   */
  type: 'inflow' | 'expense'
}

export interface TopTagsPieChartProps {
  /**
   * Array of tag summary items to display in the chart
   */
  tagStats: TagSummaryItemDto[]
  /**
   * Height of the chart in pixels
   * @default undefined
   */
  height?: number
  /**
   * Additional CSS classes to apply to the chart container
   */
  className?: string
  /**
   * Default selected view type
   * @default 'all'
   */
  defaultView?: 'all' | 'inflow' | 'expense'
  /**
   * Title text displayed above the chart
   * @default 'Tag Distribution'
   */
  title?: string
  /**
   * Description text displayed below the title
   * @default 'Overview of your transaction tags'
   */
  description?: string
  /**
   * Whether to show the chart legend
   * @default true
   */
  showLegend?: boolean
  /**
   * Minimum percentage threshold for a segment to show its label
   * @default 0
   */
  labelMinPercentage?: number
  /**
   * Minimum percentage threshold for a segment to be included in the pie chart
   * @default undefined
   */
  pieMinPercentage?: number
}

export interface ChartDataItem {
  /**
   * Name/label of the chart segment
   */
  name: string
  /**
   * Numeric value for the chart segment
   */
  value: number
  /**
   * Color to use for this chart segment
   */
  color: string
}
