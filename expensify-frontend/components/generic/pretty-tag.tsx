import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Tag as TagIcon } from 'lucide-react'
import React, { memo, useMemo } from 'react'

// Define color scheme type for better type safety and autocompletion
type ColorScheme = {
  readonly base: string
  readonly text: string
  readonly hover: string
}

// Define color schemes with better organization and type safety
const COLOR_SCHEMES = {
  violet: {
    base: 'bg-violet-50/90',
    text: 'text-violet-700',
    hover: 'hover:bg-violet-100/90'
  },
  indigo: {
    base: 'bg-indigo-50/90',
    text: 'text-indigo-700',
    hover: 'hover:bg-indigo-100/90'
  },
  blue: {
    base: 'bg-blue-50/90',
    text: 'text-blue-700',
    hover: 'hover:bg-blue-100/90'
  },
  cyan: {
    base: 'bg-cyan-50/90',
    text: 'text-cyan-700',
    hover: 'hover:bg-cyan-100/90'
  },
  teal: {
    base: 'bg-teal-50/90',
    text: 'text-teal-700',
    hover: 'hover:bg-teal-100/90'
  },
  emerald: {
    base: 'bg-emerald-50/90',
    text: 'text-emerald-700',
    hover: 'hover:bg-emerald-100/90'
  },
  green: {
    base: 'bg-green-50/90',
    text: 'text-green-700',
    hover: 'hover:bg-green-100/90'
  },
  lime: {
    base: 'bg-lime-50/90',
    text: 'text-lime-700',
    hover: 'hover:bg-lime-100/90'
  },
  amber: {
    base: 'bg-amber-50/90',
    text: 'text-amber-700',
    hover: 'hover:bg-amber-100/90'
  },
  orange: {
    base: 'bg-orange-50/90',
    text: 'text-orange-700',
    hover: 'hover:bg-orange-100/90'
  },
  rose: {
    base: 'bg-rose-50/90',
    text: 'text-rose-700',
    hover: 'hover:bg-rose-100/90'
  },
  pink: {
    base: 'bg-pink-50/90',
    text: 'text-pink-700',
    hover: 'hover:bg-pink-100/90'
  },
  purple: {
    base: 'bg-purple-50/90',
    text: 'text-purple-700',
    hover: 'hover:bg-purple-100/90'
  },
  fuchsia: {
    base: 'bg-fuchsia-50/90',
    text: 'text-fuchsia-700',
    hover: 'hover:bg-fuchsia-100/90'
  }
} as const

// Pre-compute color combinations for better performance
const TAG_COLORS = Object.values(COLOR_SCHEMES).map(
  ({ base, text, hover }) => `${base} ${text} ${hover}`
)

// Optimized hash function
const hashString = (str: string): number => {
  let hash = 0
  const len = str.length
  for (let i = 0; i < len; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0 // Bitwise OR with 0 for integer conversion
  }
  return Math.abs(hash)
}

interface PrettyTagProps {
  label: string
  className?: string
  onClick?: (label: string) => void
  showIcon?: boolean
  index?: number // Optional index for deterministic color selection
}

// Memoized component for better performance
export const PrettyTag = memo<PrettyTagProps>(
  ({ label, className, onClick, showIcon = false, index }) => {
    // Get consistent color based on label text or index
    const colorClasses = useMemo(() => {
      if (!label) return TAG_COLORS[0]
      if (typeof index === 'number')
        return TAG_COLORS[index % TAG_COLORS.length]
      return TAG_COLORS[hashString(label) % TAG_COLORS.length]
    }, [label, index])

    if (!label) return null

    return (
      <Badge
        variant='secondary'
        className={cn(
          'transition-all duration-150 ease-in-out select-none',
          'hover:scale-[1.02] active:scale-[0.98]',
          onClick && 'cursor-pointer',
          colorClasses,
          className
        )}
        onClick={onClick ? () => onClick(label) : undefined}
      >
        {showIcon && <TagIcon className='mr-1 h-3 w-3' />}
        <span className='capitalize'>{label}</span>
      </Badge>
    )
  }
)

PrettyTag.displayName = 'PrettyTag'
