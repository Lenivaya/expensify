import { expensifyApi } from '@/components/providers/query/query-provider'
import { useCallback } from 'react'

/**
 * Hook for deleting inflows
 * @returns A function that takes an inflow ID and returns a promise that resolves when the inflow is deleted
 */
export const useDeleteInflow = () => {
  const { mutateAsync } =
    expensifyApi.inflows.inflowsControllerRemove.useMutation()

  // Return a memoized function that can be passed directly to components
  return useCallback(
    async (id: string) => {
      try {
        await mutateAsync({ path: { id } })

        // Invalidate relevant queries to refresh data after deletion
        await Promise.all([
          expensifyApi.inflows.inflowsControllerFindAll.invalidateQueries(),
          expensifyApi.users.usersControllerGetFinancialSummary.invalidateQueries(),
          expensifyApi.users.usersControllerGetBalanceHistory.invalidateQueries(),
          expensifyApi.users.usersControllerGetTopTags.invalidateQueries()
        ])

        return true
      } catch (error) {
        console.error('Failed to delete inflow:', error)
        throw error
      }
    },
    [mutateAsync]
  )
}
