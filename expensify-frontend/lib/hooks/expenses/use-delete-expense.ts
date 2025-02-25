import { expensifyApi } from '@/components/providers/query/query-provider'
import { useCallback } from 'react'

/**
 * Hook for deleting expenses
 * @returns A function that takes an expense ID and returns a promise that resolves when the expense is deleted
 */
export const useDeleteExpense = () => {
  const { mutateAsync } =
    expensifyApi.expenses.expensesControllerRemove.useMutation()

  // Return a memoized function that can be passed directly to components
  return useCallback(
    async (id: string) => {
      try {
        await mutateAsync({ path: { id } })

        // Invalidate relevant queries to refresh data after deletion
        await Promise.all([
          expensifyApi.expenses.expensesControllerFindAll.invalidateQueries(),
          expensifyApi.users.usersControllerGetFinancialSummary.invalidateQueries(),
          expensifyApi.users.usersControllerGetBalanceHistory.invalidateQueries(),
          expensifyApi.users.usersControllerGetTopTags.invalidateQueries()
        ])

        return true
      } catch (error) {
        console.error('Failed to delete expense:', error)
        throw error
      }
    },
    [mutateAsync]
  )
}
