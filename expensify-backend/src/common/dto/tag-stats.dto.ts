import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'

/**
 * Data Transfer Object for tag-based statistics aggregation.
 *
 * @description
 * This DTO represents aggregated statistics for a specific tag,
 * including how many times it appears and the total monetary value
 * associated with it. Used for analyzing spending or income patterns
 * by category/tag.
 *
 * @example
 * {
 *   tag: 'groceries',
 *   count: 12,
 *   total: 450.75
 * }
 */
@Exclude()
export class TagStatistics {
  /**
   * The tag name for which statistics are calculated.
   * Tags are used to categorize transactions.
   *
   * @type {string}
   * @minLength 1
   * @required
   * @example "groceries"
   */
  @Expose()
  @ApiProperty({
    description: 'Tag name used for categorization',
    minLength: 1,
    example: 'groceries'
  })
  @IsNotEmpty()
  tag: string

  /**
   * Number of times this tag appears in the dataset.
   * Represents how many transactions are marked with this tag.
   *
   * @type {number}
   * @minimum 0
   * @required
   * @example 12
   */
  @Expose()
  @ApiProperty({
    description: 'Number of transactions with this tag',
    minimum: 0,
    example: 12
  })
  @IsNotEmpty()
  count: number

  /**
   * Total monetary value associated with this tag.
   * For expenses, this is the total spent in this category.
   * For inflows, this is the total income from this category.
   *
   * @type {number}
   * @minimum 0
   * @required
   * @example 450.75
   */
  @Expose()
  @ApiProperty({
    description: 'Total monetary value for transactions with this tag',
    minimum: 0,
    example: 450.75
  })
  @IsNotEmpty()
  total: number
}
