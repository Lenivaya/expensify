import { expensifyApi } from '@/components/providers/query/query-provider'
import { useCallback, useState } from 'react'
import { ExpenseFormValues } from '@/components/forms/expenses/expense-form'
import { toast } from 'sonner'

/**
 * Hook for editing expenses
 * @returns An object with functions and state for editing expenses
 */
export const useEditExpense = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentExpenseId, setCurrentExpenseId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get the update mutation
  const { mutateAsync } =
    expensifyApi.expenses.expensesControllerUpdate.useMutation()

  // Get the expense query for fetching the current expense data
  const { data: currentExpense, isLoading } =
    expensifyApi.expenses.expensesControllerFindOne.useQuery(
      { path: { id: currentExpenseId || '' } },
      { enabled: !!currentExpenseId }
    )

  // Open the edit dialog with the expense ID
  const openEditDialog = useCallback((id: string) => {
    setCurrentExpenseId(id)
    setIsOpen(true)
  }, [])

  // Close the edit dialog
  const closeEditDialog = useCallback(() => {
    setIsOpen(false)
    // Reset the expense ID after the dialog animation completes
    setTimeout(() => {
      setCurrentExpenseId(null)
    }, 300)
  }, [])

  // Handle form submission
  const handleSubmit = useCallback(
    async (values: ExpenseFormValues) => {
      if (!currentExpenseId) return

      setIsSubmitting(true)
      try {
        await mutateAsync({
          path: { id: currentExpenseId },
          body: {
            amount: values.amount,
            description: values.description,
            tags: values.tags
          }
        })

        // Invalidate relevant queries to refresh data
        await Promise.all([
          expensifyApi.expenses.expensesControllerFindAll.invalidateQueries(),
          expensifyApi.users.usersControllerGetFinancialSummary.invalidateQueries(),
          expensifyApi.users.usersControllerGetBalanceHistory.invalidateQueries(),
          expensifyApi.users.usersControllerGetTopTags.invalidateQueries()
        ])

        toast('Expense updated successfully')
        closeEditDialog()
      } catch (error) {
        console.error('Failed to update expense:', error)
        toast.error('Failed to update expense')
      } finally {
        setIsSubmitting(false)
      }
    },
    [mutateAsync, currentExpenseId, closeEditDialog]
  )

  // Prepare default values for the form
  const defaultValues = currentExpense
    ? {
        amount: parseFloat(currentExpense.amount),
        description: currentExpense.description || '',
        tags: currentExpense.tags || []
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
    currentExpense
  }
}
