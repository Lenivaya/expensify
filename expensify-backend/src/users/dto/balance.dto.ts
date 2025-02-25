import { ApiProperty } from '@nestjs/swagger'

export class BalanceDto {
  @ApiProperty({
    description: 'Total amount of all inflows',
    example: 5000.0
  })
  totalInflows: number

  @ApiProperty({
    description: 'Total amount of all expenses',
    example: 3000.0
  })
  totalExpenses: number

  @ApiProperty({
    description: 'Current balance (inflows - expenses)',
    example: 2000.0
  })
  balance: number
}
