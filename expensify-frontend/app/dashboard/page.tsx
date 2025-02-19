'use client'

import { ExpenseListContainer } from '@/components/expenses/expense-list-container/expense-list-container'
import { PaginationMeta } from '@/components/generic/pagination/pagination'
import { expensifyApi } from '@/components/providers/query/query-provider'
import { TopTagsPieChart } from '@/components/tags/top-tags-pie-chart/top-tags-pie-chart'
import { ExpensifyFloatingButtons } from '@/components/ui/floating-action-buttons/floating-action-buttons'
import { BalanceHistoryChart } from '@/components/users/balance-history-chart/balance-history-chart'
import { FinancialSummaryCard } from '@/components/users/financial-summary/financial-summary'
import { withAuth } from '@/lib/HOCs/withAuth'
import { useUser } from '@/lib/hooks/use-user'
import { isNone, isSome, Option } from '@/lib/utils'
import { useCallback, useState } from 'react'
import { useMutative } from 'use-mutative'
import React from 'react'
import { useDeleteExpense } from '@/lib/hooks/expenses/use-delete-expense'
import { useEditExpense } from '@/lib/hooks/expenses/use-edit-expense'
import { EditExpenseDialog } from '@/components/expenses/edit-expense-dialog/edit-expense-dialog'
import { InflowListContainer } from '@/components/inflows/inflow-list-container'
import { useDeleteInflow } from '@/lib/hooks/inflows/use-delete-inflow'
import { useEditInflow } from '@/lib/hooks/inflows/use-edit-inflow'
import { EditInflowDialog } from '@/components/inflows/edit-inflow-dialog/edit-inflow-dialog'

export default withAuth(Dashboard)

export function Dashboard() {
  return (
    <main className='min-h-screen bg-background'>
      <div className='flex flex-col gap-12 py-32'>
        <div className='w-full max-w-[120rem] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col gap-12'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[400px]'>
            <div className='h-full'>
              <UserDashboardFinanceSummary />
            </div>
            <div className='h-full'>
              <UserDashboardTopTags />
            </div>
          </div>

          <div className='h-[800px]'>
            <UserDashboardBalanceHistory />
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <div className='h-[800px]'>
              <UserDashboardExpenseList />
            </div>
            <div className='h-[800px]'>
              <UserDashboardInflowList />
            </div>
          </div>
        </div>
      </div>
      <div className='pb-16'></div>
      <ExpensifyFloatingButtons />
    </main>
  )
}

function UserDashboardFinanceSummary() {
  const { data, isLoading, error } =
    expensifyApi.users.usersControllerGetFinancialSummary.useQuery(
      {
        queryKey: ['userFinanceSummary']
      },
      {}
    )

  if (isLoading)
    return <div className='h-full animate-pulse bg-card rounded-lg' />
  if (error) {
    console.error(error)
    return (
      <div className='h-full bg-card rounded-lg flex items-center justify-center text-destructive'>
        Error loading data
      </div>
    )
  }
  if (isNone(data))
    return (
      <div className='h-full bg-card rounded-lg flex items-center justify-center text-muted-foreground'>
        No data
      </div>
    )

  return <FinancialSummaryCard data={data} className='h-full' />
}

function UserDashboardBalanceHistory() {
  const { data, isLoading, error } =
    expensifyApi.users.usersControllerGetBalanceHistory.useQuery(
      {
        queryKey: ['userBalanceHistory']
      },
      {}
    )

  if (error) {
    console.error(error)
  }

  return (
    <div className='w-full h-full bg-card rounded-lg'>
      {isLoading && <div className='w-full h-full animate-pulse' />}

      {isSome(error) && (
        <div className='w-full h-full flex items-center justify-center text-destructive'>
          Failed to load balance history
        </div>
      )}

      {!isLoading && !error && isNone(data) && (
        <div className='w-full h-full flex items-center justify-center text-muted-foreground'>
          No data available
        </div>
      )}

      {!isLoading && !error && !isNone(data) && (
        <BalanceHistoryChart
          balanceHistory={data!}
          height={600}
          className='w-full h-full'
        />
      )}
    </div>
  )
}

function UserDashboardTopTags() {
  const { data, isLoading, error } =
    expensifyApi.users.usersControllerGetTopTags.useQuery(
      {
        queryKey: ['userTopTags']
      },
      {}
    )

  if (error) {
    console.error(error)
  }

  return (
    <div className='h-full bg-card rounded-lg'>
      {isLoading && <div className='h-full w-full animate-pulse' />}

      {isSome(error) && (
        <div className='h-full w-full flex items-center justify-center text-destructive'>
          Error loading data
        </div>
      )}

      {!isLoading && !error && isNone(data) && (
        <div className='h-full w-full flex items-center justify-center text-muted-foreground'>
          No data
        </div>
      )}

      {!isLoading && !error && !isNone(data) && (
        <TopTagsPieChart
          tagStats={data!.inflowTags.concat(data!.expenseTags)}
          defaultView='all'
          pieMinPercentage={1}
          labelMinPercentage={25}
          className='h-full'
        />
      )}
    </div>
  )
}

function UserDashboardExpenseList() {
  const [search, setSearch] = useState<Option<string>>(null)
  const [pagination, setPagination] = useMutative<PaginationMeta>({
    page: 1,
    limit: 10,
    total: 0,
    pageCount: 0
  })
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const { data: userData } = useUser()
  const { data, isLoading, error } =
    expensifyApi.expenses.expensesControllerFindAll.useQuery(
      {
        queryKey: [
          'userExpenseList',
          search,
          pagination.page,
          pagination.limit,
          selectedTags
        ],
        query: {
          search,
          page: pagination.page,
          limit: pagination.limit,
          tags: selectedTags.length > 0 ? selectedTags.join(',') : undefined
        }
      },
      {}
    )

  const deleteExpense = useDeleteExpense()
  const {
    openEditDialog,
    isOpen,
    setIsOpen,
    handleSubmit,
    isLoading: isEditLoading,
    isSubmitting,
    defaultValues
  } = useEditExpense()

  const expenseList = data?.data

  // Update pagination state when data changes
  React.useEffect(() => {
    if (data?.meta) {
      console.log('Pagination meta from API:', data.meta)
      setPagination((draft) => {
        draft.total = data.meta.total
        draft.pageCount = Math.ceil(data.meta.total / pagination.limit)
        draft.page = data.meta.page
      })
    }
  }, [data?.meta, setPagination, pagination.limit])

  // Reset pagination on search or tag change
  React.useEffect(() => {
    setPagination((draft) => {
      draft.page = 1
    })
  }, [search, selectedTags, setPagination])

  const handlePaginationChange = useCallback(
    (newPagination: PaginationMeta) => {
      console.log('Pagination changed:', newPagination)
      setPagination((draft) => {
        draft.page = newPagination.page
      })
    },
    [setPagination]
  )

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteExpense(id)
    },
    [deleteExpense]
  )

  const handleEdit = useCallback(
    (id: string) => {
      openEditDialog(id)
    },
    [openEditDialog]
  )

  // Handle tag selection for filtering
  const handleTagSelect = useCallback((tag: string) => {
    setSelectedTags((prevTags) => {
      // Only add the tag if it's not already selected
      if (!prevTags.includes(tag)) {
        return [...prevTags, tag]
      }
      return prevTags
    })
  }, [])

  // Handle tag removal from filter
  const handleTagRemove = useCallback((tag: string) => {
    setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag))
  }, [])

  return (
    <>
      <ExpenseListContainer
        expenses={expenseList ?? []}
        isLoading={isLoading}
        currentUserId={userData?.id}
        onSearch={setSearch}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
        onDelete={handleDelete}
        onEdit={handleEdit}
        selectedTags={selectedTags}
        onTagSelect={handleTagSelect}
        onTagRemove={handleTagRemove}
        className='h-full'
      />
      <EditExpenseDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleSubmit={handleSubmit}
        isLoading={isEditLoading}
        isSubmitting={isSubmitting}
        defaultValues={defaultValues}
      />
    </>
  )
}

function UserDashboardInflowList() {
  const [search, setSearch] = useState<Option<string>>(null)
  const [pagination, setPagination] = useMutative<PaginationMeta>({
    page: 1,
    limit: 10,
    total: 0,
    pageCount: 0
  })
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const { data: userData } = useUser()
  const { data, isLoading, error } =
    expensifyApi.inflows.inflowsControllerFindAll.useQuery(
      {
        queryKey: [
          'userInflowList',
          search,
          pagination.page,
          pagination.limit,
          selectedTags
        ],
        query: {
          search,
          page: pagination.page,
          limit: pagination.limit,
          tags: selectedTags.length > 0 ? selectedTags.join(',') : undefined
        }
      },
      {}
    )

  const deleteInflow = useDeleteInflow()
  const {
    openEditDialog,
    isOpen,
    setIsOpen,
    handleSubmit,
    isLoading: isEditLoading,
    isSubmitting,
    defaultValues
  } = useEditInflow()

  const inflowList = data?.data

  // Update pagination state when data changes
  React.useEffect(() => {
    if (data?.meta) {
      setPagination((draft) => {
        draft.total = data.meta.total
        draft.pageCount = Math.ceil(data.meta.total / pagination.limit)
        draft.page = data.meta.page
      })
    }
  }, [data?.meta, setPagination, pagination.limit])

  // Reset pagination on search or tag change
  React.useEffect(() => {
    setPagination((draft) => {
      draft.page = 1
    })
  }, [search, selectedTags, setPagination])

  const handlePaginationChange = useCallback(
    (newPagination: PaginationMeta) => {
      setPagination((draft) => {
        draft.page = newPagination.page
      })
    },
    [setPagination]
  )

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteInflow(id)
    },
    [deleteInflow]
  )

  const handleEdit = useCallback(
    (id: string) => {
      openEditDialog(id)
    },
    [openEditDialog]
  )

  // Handle tag selection for filtering
  const handleTagSelect = useCallback((tag: string) => {
    setSelectedTags((prevTags) => {
      // Only add the tag if it's not already selected
      if (!prevTags.includes(tag)) {
        return [...prevTags, tag]
      }
      return prevTags
    })
  }, [])

  // Handle tag removal from filter
  const handleTagRemove = useCallback((tag: string) => {
    setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag))
  }, [])

  return (
    <>
      <InflowListContainer
        inflows={inflowList ?? []}
        isLoading={isLoading}
        currentUserId={userData?.id}
        onSearch={setSearch}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
        onDelete={handleDelete}
        onEdit={handleEdit}
        selectedTags={selectedTags}
        onTagSelect={handleTagSelect}
        onTagRemove={handleTagRemove}
        className='h-full'
      />
      <EditInflowDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleSubmit={handleSubmit}
        isLoading={isEditLoading}
        isSubmitting={isSubmitting}
        defaultValues={defaultValues}
      />
    </>
  )
}
