import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'
import { MetaSearchInfo } from '../../common/dto/meta-search-info.dto'
import { InflowDto } from './inflow.dto'

@Exclude()
export class InflowSearchDto {
  @Expose()
  @ApiProperty({
    description: 'List of expenses found'
  })
  @IsNotEmpty()
  data: InflowDto[]

  @Expose()
  @ApiProperty({
    description: 'Meta information about search results'
  })
  @IsNotEmpty()
  meta: MetaSearchInfo
}
