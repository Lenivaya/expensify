import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'

@Exclude()
export class TagStatistics {
  @Expose()
  @ApiProperty({
    description: 'Tag'
  })
  @IsNotEmpty()
  tag: string

  @Expose()
  @ApiProperty({
    description: 'Count of times tag appears in dataset'
  })
  @IsNotEmpty()
  count: number

  @Expose()
  @ApiProperty({
    description: 'Total value related to this tag'
  })
  @IsNotEmpty()
  total: number
}
