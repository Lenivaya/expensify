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

@Injectable()
export class InflowsService {
  constructor(private readonly drizzleService: DrizzleService) {}

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
    return inflow
  }

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
      conditions.push(sql`${inflows.tags} && ${makePgArray(tags)}`)
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

    return inflow
  }

  async remove(userId: string, id: string) {
    const [inflow] = await this.drizzleService.db
      .delete(inflows)
      .where(and(eq(inflows.id, id), eq(inflows.userId, userId)))
      .returning()

    if (!inflow) {
      throw new NotFoundException(`Inflow with ID ${id} not found`)
    }

    return inflow
  }

  async getTotalInflow(userId: string) {
    const [result] = await this.drizzleService.db
      .select({
        total: sql<number>`sum(${inflows.amount})`
      })
      .from(inflows)
      .where(eq(inflows.userId, userId))

    return result.total || 0
  }

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
