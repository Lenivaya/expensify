import { expensifyApi } from '@/components/providers/query/query-provider'
import { useCallback, useState } from 'react'
import { InflowFormValues } from '@/components/forms/inflows/inflow-form'
import { toast } from 'sonner'

/**
 * Hook for editing inflows
 * @returns An object with functions and state for editing inflows
 */
export const useEditInflow = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentInflowId, setCurrentInflowId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get the update mutation
  const { mutateAsync } =
    expensifyApi.inflows.inflowsControllerUpdate.useMutation()

  // Get the inflow query for fetching the current inflow data
  const { data: currentInflow, isLoading } =
    expensifyApi.inflows.inflowsControllerFindOne.useQuery(
      { path: { id: currentInflowId || '' } },
      { enabled: !!currentInflowId }
    )

  // Open the edit dialog with the inflow ID
  const openEditDialog = useCallback((id: string) => {
    setCurrentInflowId(id)
    setIsOpen(true)
  }, [])

  // Close the edit dialog
  const closeEditDialog = useCallback(() => {
    setIsOpen(false)
    // Reset the inflow ID after the dialog animation completes
    setTimeout(() => {
      setCurrentInflowId(null)
    }, 300)
  }, [])

  // Handle form submission
  const handleSubmit = useCallback(
    async (values: InflowFormValues) => {
      if (!currentInflowId) return

      setIsSubmitting(true)
      try {
        await mutateAsync({
          path: { id: currentInflowId },
          body: {
            amount: values.amount,
            description: values.description,
            tags: values.tags
          }
        })

        // Invalidate relevant queries to refresh data
        await Promise.all([
          expensifyApi.inflows.inflowsControllerFindAll.invalidateQueries(),
          expensifyApi.users.usersControllerGetFinancialSummary.invalidateQueries(),
          expensifyApi.users.usersControllerGetBalanceHistory.invalidateQueries(),
          expensifyApi.users.usersControllerGetTopTags.invalidateQueries()
        ])

        toast('Inflow updated successfully')
        closeEditDialog()
      } catch (error) {
        console.error('Failed to update inflow:', error)
        toast.error('Failed to update inflow')
      } finally {
        setIsSubmitting(false)
      }
    },
    [mutateAsync, currentInflowId, closeEditDialog]
  )

  // Prepare default values for the form
  const defaultValues = currentInflow
    ? {
        amount: parseFloat(currentInflow.amount),
        description: currentInflow.description || '',
        tags: currentInflow.tags || []
      }
    : undefined

  return {
    openEditDialog,
    closeEditDialog,
    handleSubmit,
    isOpen,
    setIsOpen,
    isLoading,
    isSubmitting,
    defaultValues,
    currentInflow
  }
}
