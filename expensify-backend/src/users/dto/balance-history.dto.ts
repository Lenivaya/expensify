import { ApiProperty } from '@nestjs/swagger'

export class BalanceHistoryItemDto {
  @ApiProperty({
    description: 'Year of the balance record',
    example: 2024
  })
  year: number

  @ApiProperty({
    description: 'Month of the balance record (1-12)',
    example: 3
  })
  month: number

  @ApiProperty({
    description: 'Total inflows for the period',
    example: '1500.00'
  })
  inflow: string

  @ApiProperty({
    description: 'Total expenses for the period',
    example: '1200.00'
  })
  expense: string

  @ApiProperty({
    description: 'Net balance for the period (inflows - expenses)',
    example: '300.00'
  })
  balance: string

  @ApiProperty({
    description: 'Cumulative balance up to this period',
    example: '2500.00'
  })
  cumulativeBalance: string
}
