import { ExpenseDto } from './expense.dto'
import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'
import { MetaSearchInfo } from '../../common/dto/meta-search-info.dto'
import { isNotNull } from 'drizzle-orm'

@Exclude()
export class ExpenseSearchDto {
  @Expose()
  @ApiProperty({
    description: 'List of expenses found'
  })
  @IsNotEmpty()
  data: ExpenseDto[]

  @Expose()
  @ApiProperty({
    description: 'Meta information about search results'
  })
  @IsNotEmpty()
  meta: MetaSearchInfo
}
