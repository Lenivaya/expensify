import { ApiProperty } from '@nestjs/swagger'
import { BalanceDto } from './balance.dto'

export class FinancialStatisticsDto {
  @ApiProperty({
    description: 'Average amount of inflows',
    example: 1000.0
  })
  averageInflow: number

  @ApiProperty({
    description: 'Average amount of expenses',
    example: 800.0
  })
  averageExpense: number

  @ApiProperty({
    description: 'Average monthly expenses',
    example: 1000.0
  })
  averageMonthlyInflow: number

  @ApiProperty({
    description: 'Average monthly expenses',
    example: 800.0
  })
  averageMonthlyExpense: number

  @ApiProperty({
    description: 'Total number of inflow transactions',
    example: 25
  })
  totalInflowCount: number

  @ApiProperty({
    description: 'Total number of expense transactions',
    example: 50
  })
  totalExpenseCount: number
}

export class FinancialSummaryDto {
  @ApiProperty({ type: BalanceDto })
  currentBalance: BalanceDto

  @ApiProperty({ type: FinancialStatisticsDto })
  statistics: FinancialStatisticsDto
}
