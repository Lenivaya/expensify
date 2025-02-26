import { Dialog, DialogContent } from '@/components/ui/dialog'
import { InflowForm } from '@/components/forms/inflows/inflow-form'
import { FC } from 'react'
import { InflowFormValues } from '@/components/forms/inflows/inflow-form'

/**
 * Props for the EditInflowDialog component
 * @interface EditInflowDialogProps
 * @property {boolean} isOpen - Whether the dialog is currently open
 * @property {(isOpen: boolean) => void} setIsOpen - Callback to control dialog visibility
 * @property {(values: InflowFormValues) => Promise<void>} handleSubmit - Callback when form is submitted
 * @property {boolean} isLoading - Whether the inflow data is being loaded
 * @property {boolean} isSubmitting - Whether the form is currently submitting
 * @property {Partial<InflowFormValues>} [defaultValues] - Initial values for the form
 */
export interface EditInflowDialogProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  handleSubmit: (values: InflowFormValues) => Promise<void>
  isLoading: boolean
  isSubmitting: boolean
  defaultValues?: Partial<InflowFormValues>
}

/**
 * A dialog component for editing inflow entries
 *
 * @module EditInflowDialog
 * @description
 * This component provides a modal dialog interface for editing existing inflows.
 * It wraps the InflowForm component in a dialog context and handles loading states.
 *
 * Features:
 * - Modal dialog with backdrop
 * - Loading spinner during data fetch
 * - Form for editing inflow details
 * - Controlled open/close state
 * - Responsive design
 *
 * @example
 * ```tsx
 * <EditInflowDialog
 *   isOpen={isDialogOpen}
 *   setIsOpen={setDialogOpen}
 *   handleSubmit={handleUpdateInflow}
 *   isLoading={isFetching}
 *   isSubmitting={isUpdating}
 *   defaultValues={{
 *     amount: 50.00,
 *     description: 'Salary payment',
 *     tags: ['income', 'salary']
 *   }}
 * />
 * ```
 */
export const EditInflowDialog: FC<EditInflowDialogProps> = ({
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
          <InflowForm
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
