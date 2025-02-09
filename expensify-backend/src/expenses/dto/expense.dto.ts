import { createZodDto } from 'nestjs-zod'
import { expenseSelectSchema } from 'src/database/schema/expenses.schema'

export class ExpenseDto extends createZodDto(
  expenseSelectSchema
) {}
