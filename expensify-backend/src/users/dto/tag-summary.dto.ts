import { ApiProperty } from '@nestjs/swagger'

export class TagSummaryItemDto {
  @ApiProperty({
    description: 'Tag name',
    example: 'groceries'
  })
  tag: string

  @ApiProperty({
    description: 'Total amount for this tag',
    example: '500.00'
  })
  amount: string

  @ApiProperty({
    description: 'Type of transaction',
    example: 'expense',
    enum: ['inflow', 'expense']
  })
  type: 'inflow' | 'expense'
}

export class TagSummaryDto {
  @ApiProperty({
    type: [TagSummaryItemDto],
    description: 'Top inflow tags with amounts'
  })
  inflowTags: TagSummaryItemDto[]

  @ApiProperty({
    type: [TagSummaryItemDto],
    description: 'Top expense tags with amounts'
  })
  expenseTags: TagSummaryItemDto[]
}
