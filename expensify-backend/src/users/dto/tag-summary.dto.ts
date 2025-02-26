import { ApiProperty } from '@nestjs/swagger'

/**
 * Data Transfer Object representing a single tag with its associated financial data.
 *
 * This DTO contains information about a specific tag, including its name,
 * the total monetary amount associated with it, and the type of transactions
 * it represents (either inflow or expense).
 *
 * @example
 * {
 *   tag: "groceries",
 *   amount: 500.00,
 *   type: "expense"
 * }
 */
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
  amount: number

  @ApiProperty({
    description: 'Type of transaction',
    example: 'expense',
    enum: ['inflow', 'expense']
  })
  type: 'inflow' | 'expense'
}

/**
 * Data Transfer Object representing a summary of a user's top tags.
 *
 * This DTO provides an overview of a user's most significant financial categories,
 * separated into inflow (income) tags and expense tags. Each category includes
 * the tag name and the total amount associated with it.
 *
 * This information is useful for visualizing spending patterns and income sources.
 *
 * @example
 * {
 *   inflowTags: [
 *     { tag: "salary", amount: 3000.00, type: "inflow" },
 *     { tag: "freelance", amount: 500.00, type: "inflow" }
 *   ],
 *   expenseTags: [
 *     { tag: "rent", amount: 1200.00, type: "expense" },
 *     { tag: "groceries", amount: 500.00, type: "expense" }
 *   ]
 * }
 */
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
