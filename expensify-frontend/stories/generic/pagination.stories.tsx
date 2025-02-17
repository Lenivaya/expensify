import type { Meta, StoryObj } from '@storybook/react'
import {
  Pagination,
  type PaginationProps
} from '@/components/generic/pagination/pagination'
import { ArrowLeft, ArrowRight, MoveLeft, MoveRight } from 'lucide-react'
import React from 'react'

const meta = {
  title: 'Components/Generic/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => {
      // Create state for page and limit
      const [page, setPage] = React.useState(context.args.meta.page)
      const [limit, setLimit] = React.useState(context.args.meta.limit)

      // Calculate new meta based on state
      const meta = {
        ...context.args.meta,
        page,
        limit
      }

      // Create handlers
      const handlePageChange = (newPage: number) => {
        console.log('Page changed to:', newPage)
        setPage(newPage)
      }

      const handleLimitChange = (newLimit: number) => {
        console.log('Limit changed to:', newLimit)
        setLimit(newLimit)
        // Reset to first page when changing limit
        setPage(1)
      }

      // Merge props with state handlers
      const props: PaginationProps = {
        ...context.args,
        meta,
        onPageChange: handlePageChange,
        onLimitChange: handleLimitChange
      }

      return <Story args={props} />
    }
  ]
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

// Default handlers that will be overridden by the decorator
const defaultHandlers = {
  onPageChange: () => {},
  onLimitChange: () => {}
}

const defaultArgs = {
  meta: {
    page: 1,
    limit: 10,
    total: 100,
    pageCount: 10
  },
  ...defaultHandlers
}

export const Default: Story = {
  args: defaultArgs
}

export const WithCustomPageSizes: Story = {
  args: {
    ...defaultArgs,
    pageSizeOptions: [5, 15, 25, 50]
  }
}

export const WithoutPageSize: Story = {
  args: {
    ...defaultArgs,
    showPageSize: false
  }
}

export const WithoutInfo: Story = {
  args: {
    ...defaultArgs,
    showInfo: false
  }
}

export const MinimalView: Story = {
  args: {
    ...defaultArgs,
    showInfo: false,
    showPageSize: false
  }
}

export const CustomIcons: Story = {
  args: {
    ...defaultArgs,
    icons: {
      first: MoveLeft,
      previous: ArrowLeft,
      next: ArrowRight,
      last: MoveRight
    }
  }
}

export const CustomLabels: Story = {
  args: {
    ...defaultArgs,
    labels: {
      show: 'Display',
      perPage: 'items',
      results: 'entries',
      page: 'Current:',
      of: '/'
    }
  }
}

export const CustomStyles: Story = {
  args: {
    ...defaultArgs,
    styles: {
      container: 'bg-muted p-4 rounded-lg',
      navigation: 'bg-background p-2 rounded-md shadow-sm',
      info: 'text-xs font-medium',
      pageSize: 'bg-background p-2 rounded-md',
      iconSize: 20
    }
  }
}

export const LastPage: Story = {
  args: {
    ...defaultArgs,
    meta: {
      page: 10,
      limit: 10,
      total: 100,
      pageCount: 10
    }
  }
}

export const SinglePage: Story = {
  args: {
    ...defaultArgs,
    meta: {
      page: 1,
      limit: 10,
      total: 5,
      pageCount: 1
    }
  }
}

export const LargeDataset: Story = {
  args: {
    ...defaultArgs,
    meta: {
      page: 1,
      limit: 50,
      total: 1000,
      pageCount: 20
    },
    pageSizeOptions: [50, 100, 200, 500]
  }
}
