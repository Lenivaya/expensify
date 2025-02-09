import { ApiProperty } from '@nestjs/swagger'

export class BalanceDto {
  @ApiProperty({
    description: 'Total amount of all inflows',
    example: '5000.00'
  })
  totalInflows: string

  @ApiProperty({
    description: 'Total amount of all expenses',
    example: '3000.00'
  })
  totalExpenses: string

  @ApiProperty({
    description: 'Current balance (inflows - expenses)',
    example: '2000.00'
  })
  balance: string
}
