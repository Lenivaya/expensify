import { Injectable, NotFoundException } from '@nestjs/common'
import { SQL, and, desc, eq, ilike, or, sql } from 'drizzle-orm'
import { makePgArray } from 'drizzle-orm/pg-core'
import { isSome } from 'lib/utils'
import { DrizzleService } from 'src/database/drizzle.service'
import { inflows } from 'src/database/schema/inflows.schema'
import { CreateInflowDto } from './dto/create-inflow.dto'
import { InflowDto } from './dto/inflow.dto'
import { UpdateInflowDto } from './dto/update-inflow.dto'
import { InflowSearchDto } from './dto/inflow-search.dto'
import { TagStatistics } from 'src/common/dto/tag-stats.dto'
import { MonthlyStats } from 'src/common/dto/month-stats.dto'
import { UsersService } from 'src/users/users.service'

/**
 * Service responsible for managing inflow (income) operations.
 * Handles CRUD operations, statistics, and data aggregation for inflows.
 */
@Injectable()
export class InflowsService {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly usersService: UsersService
  ) {}

  /**
   * Creates a new inflow record for a user
   * @param userId - The ID of the user creating the inflow
   * @param createInflowDto - The inflow data to create
   * @returns The created inflow record
   */
  async create(
    userId: string,
    createInflowDto: CreateInflowDto
  ): Promise<InflowDto> {
    const [inflow] = await this.drizzleService.db
      .insert(inflows)
      .values({
        amount: String(createInflowDto.amount),
        description: createInflowDto.description,
        tags: createInflowDto.tags,
        userId
      })
      .returning()

    // Invalidate user stats cache after creating new inflow
    await this.usersService.invalidateUserStatsCache(userId)
    return inflow
  }

  /**
   * Retrieves all inflows for a user with optional filtering and pagination
   * @param userId - The ID of the user
   * @param params - Optional search parameters
   * @param params.search - Search term for filtering by description or tags
   * @param params.tags - Array of tags to filter by
   * @param params.page - Page number for pagination
   * @param params.limit - Number of items per page
   * @returns Paginated list of inflows matching the criteria
   */
  async findAll(
    userId: string,
    params?: {
      search?: string
      tags?: string[]
      page?: number
      limit?: number
    }
  ): Promise<InflowSearchDto> {
    const { search, tags, page = 1, limit = 10 } = params || {}
    const offset = (page - 1) * limit

    const conditions: SQL[] = [eq(inflows.userId, userId)]

    if (search) {
      const searchTerms = search.trim().split(/\s+/).filter(Boolean)

      if (searchTerms.length > 0) {
        const searchConditions = searchTerms
          .map((term) =>
            or(
              ilike(inflows.description, `%${term}%`),
              sql`EXISTS (
              SELECT 1
              FROM unnest(${inflows.tags}) AS tag
              WHERE tag ILIKE ${`%${term}%`}
            )`
            )
          )
          .filter(isSome)

        if (searchConditions.length > 0) {
          conditions.push(and(...searchConditions) as SQL)
        }
      }
    }

    if (tags && tags.length > 0) {
      const tagConditions = tags.map(
        (tag) => sql`${tag} = ANY(${inflows.tags})`
      )
      conditions.push(and(...tagConditions) as SQL)
    }

    const query = this.drizzleService.db
      .select()
      .from(inflows)
      .orderBy(desc(inflows.createdAt))
      .limit(limit)
      .offset(offset)
      .where(conditions.length > 0 ? and(...conditions) : undefined)

    const [result, [{ count }]] = await Promise.all([
      query,
      this.drizzleService.db
        .select({ count: sql<number>`count(*)` })
        .from(inflows)
        .where(and(...conditions))
    ])

    return {
      data: result,
      meta: {
        total: Number(count),
        page,
        limit,
        pageCount: Math.ceil(Number(count) / limit)
      }
    }
  }

  /**
   * Finds a specific inflow by ID for a user
   * @param userId - The ID of the user
   * @param id - The ID of the inflow to find
   * @returns The found inflow record
   * @throws NotFoundException if the inflow doesn't exist
   */
  async findById(userId: string, id: string) {
    const [inflow] = await this.drizzleService.db
      .select()
      .from(inflows)
      .where(and(eq(inflows.id, id), eq(inflows.userId, userId)))

    if (!inflow) {
      throw new NotFoundException(`Inflow with ID ${id} not found`)
    }

    return inflow
  }

  /**
   * Updates an existing inflow record
   * @param userId - The ID of the user
   * @param id - The ID of the inflow to update
   * @param updateInflowDto - The data to update
   * @returns The updated inflow record
   * @throws NotFoundException if the inflow doesn't exist
   */
  async update(userId: string, id: string, updateInflowDto: UpdateInflowDto) {
    const [inflow] = await this.drizzleService.db
      .update(inflows)
      .set({
        ...(updateInflowDto.amount
          ? { amount: String(updateInflowDto.amount) }
          : {}),
        ...(updateInflowDto.description
          ? { description: updateInflowDto.description }
          : {}),
        ...(updateInflowDto.tags ? { tags: updateInflowDto.tags } : {}),
        updatedAt: new Date()
      })
      .where(and(eq(inflows.id, id), eq(inflows.userId, userId)))
      .returning()

    if (!inflow) {
      throw new NotFoundException(`Inflow with ID ${id} not found`)
    }

    // Invalidate user stats cache after updating inflow
    await this.usersService.invalidateUserStatsCache(userId)
    return inflow
  }

  /**
   * Removes an inflow record
   * @param userId - The ID of the user
   * @param id - The ID of the inflow to remove
   * @returns The removed inflow record
   * @throws NotFoundException if the inflow doesn't exist
   */
  async remove(userId: string, id: string) {
    const [inflow] = await this.drizzleService.db
      .delete(inflows)
      .where(and(eq(inflows.id, id), eq(inflows.userId, userId)))
      .returning()

    if (!inflow) {
      throw new NotFoundException(`Inflow with ID ${id} not found`)
    }

    // Invalidate user stats cache after removing inflow
    await this.usersService.invalidateUserStatsCache(userId)
    return inflow
  }

  /**
   * Calculates the total amount of all inflows for a user
   * @param userId - The ID of the user
   * @returns The total amount of all inflows
   */
  async getTotalInflow(userId: string) {
    const [result] = await this.drizzleService.db
      .select({
        total: sql<number>`sum(${inflows.amount})`
      })
      .from(inflows)
      .where(eq(inflows.userId, userId))

    return result.total || 0
  }

  /**
   * Retrieves statistics about inflow tags
   * @param userId - The ID of the user
   * @returns Array of tag statistics including usage count and total amount
   */
  async getTagStats(userId: string): Promise<TagStatistics[]> {
    const result = await this.drizzleService.db
      .select({
        tag: sql<string>`unnest(${inflows.tags})`,
        count: sql<number>`count(*)`,
        total: sql<number>`sum(${inflows.amount})`
      })
      .from(inflows)
      .where(eq(inflows.userId, userId))
      .groupBy(sql`unnest(${inflows.tags})`)
      .orderBy(sql`count(*) desc`)

    return result
  }

  /**
   * Retrieves monthly statistics for inflows in a specific year
   * @param userId - The ID of the user
   * @param year - The year to get statistics for
   * @returns Array of monthly statistics
   */
  async getMonthlyStats(userId: string, year: number): Promise<MonthlyStats[]> {
    const result = await this.drizzleService.db
      .select({
        month: sql<number>`EXTRACT(MONTH FROM ${inflows.createdAt})`,
        count: sql<number>`count(*)`,
        total: sql<number>`sum(${inflows.amount})`
      })
      .from(inflows)
      .where(
        and(
          eq(inflows.userId, userId),
          sql`EXTRACT(YEAR FROM ${inflows.createdAt}) = ${year}`
        )
      )
      .groupBy(sql`EXTRACT(MONTH FROM ${inflows.createdAt})`)
      .orderBy(sql`EXTRACT(MONTH FROM ${inflows.createdAt})`)

    return result
  }
}
