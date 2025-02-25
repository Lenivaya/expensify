import { Dialog, DialogContent } from '@/components/ui/dialog'
import { InflowForm } from '@/components/forms/inflows/inflow-form'
import { FC } from 'react'
import { InflowFormValues } from '@/components/forms/inflows/inflow-form'

export interface EditInflowDialogProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  handleSubmit: (values: InflowFormValues) => Promise<void>
  isLoading: boolean
  isSubmitting: boolean
  defaultValues?: Partial<InflowFormValues>
}

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
