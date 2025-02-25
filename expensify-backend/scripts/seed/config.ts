import { CountRange, DateRange, ExpenseCategory, IncomeSource } from './types'

export const DATE_RANGE: DateRange = { start: 2020, end: 2025 }
export const MONTHLY_EXPENSES_RANGE: CountRange = { min: 15, max: 30 }
export const MONTHLY_INFLOWS_RANGE: CountRange = { min: 1, max: 3 }

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  {
    category: 'Groceries',
    tags: ['food', 'groceries'],
    amountRange: { min: 50, max: 300 },
    frequency: 'weekly',
    variance: 0.2
  }
  // ... rest of the categories (moved from original file)
]

export const INCOME_SOURCES: IncomeSource[] = [
  {
    source: 'Salary',
    tags: ['salary', 'main-income'],
    amountRange: { min: 3000, max: 6000 },
    frequency: 'monthly',
    variance: 0,
    bonusMonths: [6, 12]
  }
  // ... rest of the sources (moved from original file)
]
