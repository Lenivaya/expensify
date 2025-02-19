export interface ExpenseCategory {
  category: string
  tags: string[]
  amountRange: { min: number; max: number }
  frequency: 'weekly' | 'monthly' | 'random'
  variance: number
  seasonal?: boolean
}

export interface IncomeSource {
  source: string
  tags: string[]
  amountRange: { min: number; max: number }
  frequency: 'monthly' | 'random'
  variance: number
  seasonal?: boolean
  bonusMonths?: number[]
}

export interface DateRange {
  start: number
  end: number
}

export interface CountRange {
  min: number
  max: number
}
