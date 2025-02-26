import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'

/**
 * Data Transfer Object for pagination and search result metadata.
 *
 * @description
 * This DTO provides information about paginated search results,
 * including the current page, items per page, total items, and
 * total number of pages. Used across the application for consistent
 * pagination handling.
 *
 * @example
 * {
 *   page: 1,
 *   limit: 10,
 *   total: 45,
 *   pageCount: 5
 * }
 */
@Exclude()
export class MetaSearchInfo {
  /**
   * Current page number in the paginated results.
   * Pages are 1-indexed (first page is 1, not 0).
   *
   * @type {number}
   * @minimum 1
   * @required
   * @example 1
   */
  @Expose()
  @ApiProperty({
    description: 'Current page number (1-indexed)',
    minimum: 1,
    example: 1
  })
  @IsNotEmpty()
  page: number

  /**
   * Maximum number of items per page.
   * Controls how many items are returned in each page of results.
   *
   * @type {number}
   * @minimum 1
   * @required
   * @example 10
   */
  @Expose()
  @ApiProperty({
    description: 'Number of items per page',
    minimum: 1,
    example: 10
  })
  @IsNotEmpty()
  limit: number

  /**
   * Total number of items matching the search criteria.
   * This is the total count before pagination is applied.
   *
   * @type {number}
   * @minimum 0
   * @required
   * @example 45
   */
  @Expose()
  @ApiProperty({
    description: 'Total number of items matching the search criteria',
    minimum: 0,
    default: 10,
    example: 45
  })
  @IsNotEmpty()
  total: number

  /**
   * Total number of pages available based on the total items and limit.
   * Calculated as Math.ceil(total / limit).
   *
   * @type {number}
   * @minimum 1
   * @required
   * @example 5
   */
  @Expose()
  @ApiProperty({
    description: 'Total number of pages available',
    minimum: 1,
    default: 1,
    example: 5
  })
  @IsNotEmpty()
  pageCount: number
}
