import { ApiProperty } from '@nestjs/swagger'
import { BalanceDto } from './balance.dto'

export class FinancialStatisticsDto {
  @ApiProperty({
    description: 'Average amount of inflows',
    example: '1000.00'
  })
  averageInflow: string

  @ApiProperty({
    description: 'Average amount of expenses',
    example: '800.00'
  })
  averageExpense: string

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
