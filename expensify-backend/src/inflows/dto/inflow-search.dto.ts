import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'
import { MetaSearchInfo } from '../../common/dto/meta-search-info.dto'
import { InflowDto } from './inflow.dto'

/**
 * Data Transfer Object for inflow search results.
 *
 * @description
 * This DTO represents the paginated search results for inflow records.
 * It includes both the actual inflow data and metadata about the search results
 * such as pagination information and total count.
 *
 * @example
 * {
 *   data: [
 *     {
 *       id: '1',
 *       amount: 2500.0,
 *       description: 'Monthly salary',
 *       tags: ['salary'],
 *       createdAt: '2024-02-26T10:00:00Z',
 *       updatedAt: '2024-02-26T10:00:00Z'
 *     }
 *   ],
 *   meta: {
 *     total: 1,
 *     page: 1,
 *     limit: 10
 *   }
 * }
 */
@Exclude()
export class InflowSearchDto {
  @Expose()
  @ApiProperty({
    description: 'Array of inflow records matching the search criteria',
    type: [InflowDto]
  })
  @IsNotEmpty()
  data: InflowDto[]

  @Expose()
  @ApiProperty({
    description:
      'Metadata about the search results including pagination information',
    type: MetaSearchInfo
  })
  @IsNotEmpty()
  meta: MetaSearchInfo
}
