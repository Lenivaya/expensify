import { ApiProperty } from '@nestjs/swagger'

export class MonthlyBalanceDto {
  @ApiProperty({
    description: 'Month number (1-12)',
    example: 1
  })
  month: number

  @ApiProperty({
    description: 'Total inflows for the month',
    example: '1000.00'
  })
  inflow: string

  @ApiProperty({
    description: 'Total expenses for the month',
    example: '800.00'
  })
  expense: string

  @ApiProperty({
    description: 'Balance for the month',
    example: '200.00'
  })
  balance: string
}
