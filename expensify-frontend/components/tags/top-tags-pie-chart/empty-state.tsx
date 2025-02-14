import { memo } from 'react'

export const EmptyState = memo(function EmptyState() {
  return (
    <div className="flex h-[200px] flex-col items-center justify-center space-y-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-muted-foreground/50"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-labelledby="chartEmptyStateTitle"
        role="img"
      >
        <title id="chartEmptyStateTitle">
          No data chart illustration
        </title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
      <div className="text-center">
        <p className="font-medium text-muted-foreground">
          No data available
        </p>
        <p className="text-muted-foreground/70 text-sm">
          Add some transactions to see the distribution
        </p>
      </div>
    </div>
  )
})
