import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'

@Exclude()
export class MonthlyStats {
  @Expose()
  @ApiProperty({
    description: 'Month'
  })
  @IsNotEmpty()
  month: number

  @Expose()
  @ApiProperty({
    description: 'Count of times some thing appears per month'
  })
  @IsNotEmpty()
  count: number

  @Expose()
  @ApiProperty({
    description: 'Total value related to this month'
  })
  @IsNotEmpty()
  total: number
}
