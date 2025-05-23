import { ExpenseDto } from './expense.dto'
import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'
import { MetaSearchInfo } from '../../common/dto/meta-search-info.dto'
import { isNotNull } from 'drizzle-orm'

/**
 * Data Transfer Object for expense search results.
 *
 * @description
 * This DTO represents the paginated search results for expense records.
 * It includes both the actual expense data and metadata about the search results
 * such as pagination information and total count.
 *
 * @example
 * {
 *   data: [
 *     {
 *       id: '1',
 *       amount: 29.99,
 *       description: 'Grocery shopping',
 *       tags: ['food', 'groceries'],
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
export class ExpenseSearchDto {
  @Expose()
  @ApiProperty({
    description: 'Array of expense records matching the search criteria',
    type: [ExpenseDto]
  })
  @IsNotEmpty()
  data: ExpenseDto[]

  @Expose()
  @ApiProperty({
    description:
      'Metadata about the search results including pagination information',
    type: MetaSearchInfo
  })
  @IsNotEmpty()
  meta: MetaSearchInfo
}
