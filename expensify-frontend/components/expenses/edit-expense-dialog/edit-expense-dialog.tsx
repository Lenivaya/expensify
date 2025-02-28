import { Dialog, DialogContent } from '@/components/ui/dialog'
import { ExpenseForm } from '@/components/forms/expenses/expense-form'
import { FC } from 'react'
import { ExpenseFormValues } from '@/components/forms/expenses/expense-form'

/**
 * Props for the EditExpenseDialog component
 * @interface EditExpenseDialogProps
 * @property {boolean} isOpen - Whether the dialog is currently open
 * @property {(isOpen: boolean) => void} setIsOpen - Callback to control dialog visibility
 * @property {(values: ExpenseFormValues) => Promise<void>} handleSubmit - Callback when form is submitted
 * @property {boolean} isLoading - Whether the expense data is being loaded
 * @property {boolean} isSubmitting - Whether the form is currently submitting
 * @property {Partial<ExpenseFormValues>} [defaultValues] - Initial values for the form
 */
export interface EditExpenseDialogProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  handleSubmit: (values: ExpenseFormValues) => Promise<void>
  isLoading: boolean
  isSubmitting: boolean
  defaultValues?: Partial<ExpenseFormValues>
}

/**
 * A dialog component for editing expense entries
 *
 * @description
 * This component provides a modal dialog interface for editing existing expenses.
 * It wraps the ExpenseForm component in a dialog context and handles loading states.
 *
 * Features:
 * - Modal dialog with backdrop
 * - Loading spinner during data fetch
 * - Form for editing expense details
 * - Controlled open/close state
 * - Responsive design
 *
 * @example
 * ```tsx
 * <EditExpenseDialog
 *   isOpen={isDialogOpen}
 *   setIsOpen={setDialogOpen}
 *   handleSubmit={handleUpdateExpense}
 *   isLoading={isFetching}
 *   isSubmitting={isUpdating}
 *   defaultValues={{
 *     amount: 50.00,
 *     description: 'Grocery shopping',
 *     tags: ['food', 'essentials']
 *   }}
 * />
 * ```
 */
export const EditExpenseDialog: FC<EditExpenseDialogProps> = ({
  isOpen,
  setIsOpen,
  handleSubmit,
  isLoading,
  isSubmitting,
  defaultValues
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        {isLoading ? (
          <div className='flex justify-center items-center p-8'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary' />
          </div>
        ) : (
          <ExpenseForm
            onSubmit={handleSubmit}
            defaultValues={defaultValues}
            isEditing={true}
            isSubmitting={isSubmitting}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
