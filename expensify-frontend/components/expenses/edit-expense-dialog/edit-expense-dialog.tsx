import { Dialog, DialogContent } from '@/components/ui/dialog'
import { ExpenseForm } from '@/components/forms/expenses/expense-form'
import { FC } from 'react'
import { ExpenseFormValues } from '@/components/forms/expenses/expense-form'

export interface EditExpenseDialogProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  handleSubmit: (values: ExpenseFormValues) => Promise<void>
  isLoading: boolean
  isSubmitting: boolean
  defaultValues?: Partial<ExpenseFormValues>
}

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
