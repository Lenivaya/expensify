/**
 * Color palette for the pie chart segments
 * @description
 * A collection of tailwind colors used for the pie chart segments.
 * Colors are chosen for good contrast and visual distinction.
 *
 * @constant
 * @type {string[]}
 */
export const COLORS = [
  '#3B82F6', // blue-500
  '#F97316', // orange-500
  '#10B981', // emerald-500
  '#8B5CF6', // violet-500
  '#EC4899', // pink-500
  '#14B8A6', // teal-500
  '#F59E0B', // amber-500
  '#6366F1', // indigo-500
  '#84CC16', // lime-500
  '#0EA5E9' // sky-500
]

/**
 * Default height for the pie chart in pixels
 * @constant
 * @type {number}
 */
export const DEFAULT_CHART_HEIGHT = 300

/**
 * Default view mode for the chart
 * @constant
 * @type {'all' | 'inflow' | 'expense'}
 */
export const DEFAULT_VIEW = 'all'

/**
 * Default title text for the chart
 * @constant
 * @type {string}
 */
export const DEFAULT_TITLE = 'Tag Distribution'

/**
 * Default description text for the chart
 * @constant
 * @type {string}
 */
export const DEFAULT_DESCRIPTION = 'Overview of your financial categories'

/**
 * Default minimum percentage for a segment to show its label
 * @constant
 * @type {number}
 * @description
 * Segments with a percentage less than this value will not display their labels
 * to prevent overcrowding.
 */
export const DEFAULT_LABEL_MIN_PERCENTAGE = 5
