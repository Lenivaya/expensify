import {
  ExpenseForm,
  ExpenseFormValues
} from '@/components/forms/expenses/expense-form'
import {
  InflowForm,
  InflowFormValues
} from '@/components/forms/inflows/inflow-form'
import { expensifyApi } from '@/components/providers/query/query-provider'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { DollarSign, HandCoins } from 'lucide-react'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'

export function ExpensifyFloatingButtons({
  className
}: {
  className?: string
}) {
  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-50 flex flex-col-reverse sm:flex-row gap-4',
        className
      )}
    >
      <AddInflowFloatingButton />
      <AddExpenseFloatingButton />
    </div>
  )
}

function AddInflowFloatingButton() {
  const [open, setOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const createInflow = expensifyApi.inflows.inflowsControllerCreate.useMutation(
    {},
    {}
  )
  const createInflowCount =
    expensifyApi.inflows.inflowsControllerCreate.useIsMutating()
  const fetching = createInflowCount > 0

  const handleSubmit = useCallback(
    async (values: InflowFormValues) => {
      await createInflow.mutateAsync(values)
      toast('Inflow recorded successfully')
      setOpen(false)
    },
    [createInflow, setOpen]
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className='relative group'>
          {isHovered && (
            <div className='absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-emerald-600 text-white px-3 py-1.5 rounded-lg whitespace-nowrap text-sm font-medium animate-in fade-in-0 zoom-in-95'>
              Add Income
            </div>
          )}
          <Button
            size='icon'
            className='h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 relative bg-emerald-600 hover:bg-emerald-700 group'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={fetching}
          >
            <div className='absolute inset-0 rounded-full bg-emerald-600/20 group-hover:bg-emerald-600/30 transition-colors' />
            <HandCoins className='h-7 w-7 transition-transform group-hover:scale-110' />
            <span className='sr-only'>Add Income</span>
          </Button>
        </div>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className='bg-transparent data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:duration-300 data-[state=closed]:duration-200' />
        <DialogContent className='sm:max-w-[425px] bg-transparent p-0 gap-0 border-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=open]:duration-300 data-[state=closed]:duration-200'>
          <div className='relative px-6 pt-10 pb-4 bg-gradient-to-b from-[#0B0E14]/10 to-[#0B0E14]/5 backdrop-blur-[3px] rounded-xl shadow-lg'>
            <InflowForm onSubmit={handleSubmit} />
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

function AddExpenseFloatingButton() {
  const [open, setOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const createExpense =
    expensifyApi.expenses.expensesControllerCreate.useMutation({}, {})
  const createExpenseCount =
    expensifyApi.expenses.expensesControllerCreate.useIsMutating()
  const fetching = createExpenseCount > 0

  const handleSubmit = useCallback(
    async (values: ExpenseFormValues) => {
      await createExpense.mutateAsync(values)
      toast('Expense created successfully')
      setOpen(false)
    },
    [createExpense, setOpen]
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className='relative group'>
          {isHovered && (
            <div className='absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-destructive text-destructive-foreground px-3 py-1.5 rounded-lg whitespace-nowrap text-sm font-medium animate-in fade-in-0 zoom-in-95'>
              Add Expense
            </div>
          )}
          <Button
            size='icon'
            variant='destructive'
            className='h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 relative group'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={fetching}
          >
            <div className='absolute inset-0 rounded-full bg-destructive/20 group-hover:bg-destructive/30 transition-colors' />
            <DollarSign className='h-7 w-7 transition-transform group-hover:scale-110' />
            <span className='sr-only'>Add Expense</span>
          </Button>
        </div>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className='bg-transparent data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:duration-300 data-[state=closed]:duration-200' />
        <DialogContent className='sm:max-w-[425px] bg-transparent p-0 gap-0 border-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=open]:duration-300 data-[state=closed]:duration-200'>
          <div className='relative px-6 pt-10 pb-4 bg-gradient-to-b from-[#0B0E14]/10 to-[#0B0E14]/5 backdrop-blur-[3px] rounded-xl shadow-lg'>
            <ExpenseForm onSubmit={handleSubmit} />
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
