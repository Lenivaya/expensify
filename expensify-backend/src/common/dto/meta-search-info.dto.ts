import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'

@Exclude()
export class MetaSearchInfo {
  @Expose()
  @ApiProperty({
    description: 'Page'
  })
  @IsNotEmpty()
  page: number

  @Expose()
  @ApiProperty({
    description: 'Limit'
  })
  @IsNotEmpty()
  limit: number

  @Expose()
  @ApiProperty({
    description: 'Total found',
    default: 10
  })
  @IsNotEmpty()
  total: number

  @Expose()
  @ApiProperty({
    description: 'Number of pages',
    default: 1
  })
  @IsNotEmpty()
  pageCount: number
}
