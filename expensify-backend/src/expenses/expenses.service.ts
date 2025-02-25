import { Injectable, NotFoundException } from '@nestjs/common'
import { SQL, and, desc, eq, ilike, or, sql } from 'drizzle-orm'
import { isSome } from 'lib/utils'
import { MonthlyStats } from 'src/common/dto/month-stats.dto'
import { TagStatistics } from 'src/common/dto/tag-stats.dto'
import { DrizzleService } from 'src/database/drizzle.service'
import { expenses } from 'src/database/schema/expenses.schema'
import { UsersService } from 'src/users/users.service'
import { CreateExpenseDto } from './dto/create-expense.dto'
import { ExpenseSearchDto } from './dto/expenses-search.dto'
import { UpdateExpenseDto } from './dto/update-expense.dto'

@Injectable()
export class ExpensesService {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly usersService: UsersService
  ) {}

  async create(userId: string, createExpenseDto: CreateExpenseDto) {
    const [expense] = await this.drizzleService.db
      .insert(expenses)
      .values({
        amount: String(createExpenseDto.amount),
        description: createExpenseDto.description,
        tags: createExpenseDto.tags,
        userId
      })
      .returning()

    // Invalidate user stats cache after creating new expense
    await this.usersService.invalidateUserStatsCache(userId)
    return expense
  }

  async findAll(
    userId: string,
    params?: {
      search?: string
      tags?: string[]
      page?: number
      limit?: number
    }
  ): Promise<ExpenseSearchDto> {
    const { search, tags, page = 1, limit = 10 } = params || {}
    const offset = (page - 1) * limit

    const conditions: SQL[] = [eq(expenses.userId, userId)]

    if (search) {
      const searchTerms = search.trim().split(/\s+/).filter(Boolean)

      if (searchTerms.length > 0) {
        const searchConditions = searchTerms
          .map((term) =>
            or(
              ilike(expenses.description, `%${term}%`),
              sql`EXISTS (
              SELECT 1
              FROM unnest(${expenses.tags}) AS tag
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
      // conditions.push(sql`${expenses.tags} && ${makePgArray(tags)}`)
      const tagConditions = tags.map(
        (tag) => sql`${tag} = ANY(${expenses.tags})`
      )
      conditions.push(and(...tagConditions) as SQL)
    }

    const query = this.drizzleService.db
      .select()
      .from(expenses)
      .orderBy(desc(expenses.createdAt))
      .limit(limit)
      .offset(offset)
      .where(conditions.length > 0 ? and(...conditions) : undefined)

    const [result, [{ count }]] = await Promise.all([
      query,
      this.drizzleService.db
        .select({ count: sql<number>`count(*)` })
        .from(expenses)
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
    const [expense] = await this.drizzleService.db
      .select()
      .from(expenses)
      .where(and(eq(expenses.id, id), eq(expenses.userId, userId)))

    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`)
    }

    return expense
  }

  async update(userId: string, id: string, updateExpenseDto: UpdateExpenseDto) {
    const [expense] = await this.drizzleService.db
      .update(expenses)
      .set({
        ...(updateExpenseDto.amount
          ? { amount: String(updateExpenseDto.amount) }
          : {}),
        ...(updateExpenseDto.description
          ? { description: updateExpenseDto.description }
          : {}),
        ...(updateExpenseDto.tags ? { tags: updateExpenseDto.tags } : {}),
        updatedAt: new Date()
      })
      .where(and(eq(expenses.id, id), eq(expenses.userId, userId)))
      .returning()

    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`)
    }

    // Invalidate user stats cache after updating expense
    await this.usersService.invalidateUserStatsCache(userId)
    return expense
  }

  async remove(userId: string, id: string) {
    const [expense] = await this.drizzleService.db
      .delete(expenses)
      .where(and(eq(expenses.id, id), eq(expenses.userId, userId)))
      .returning()

    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`)
    }

    // Invalidate user stats cache after removing expense
    await this.usersService.invalidateUserStatsCache(userId)
    return expense
  }

  async getTotalSpent(userId: string) {
    const [result] = await this.drizzleService.db
      .select({
        total: sql<number>`sum(${expenses.amount})`
      })
      .from(expenses)
      .where(eq(expenses.userId, userId))

    return result.total || 0
  }

  async getTagStats(userId: string): Promise<TagStatistics[]> {
    const result = await this.drizzleService.db
      .select({
        tag: sql<string>`unnest(${expenses.tags})`,
        count: sql<number>`count(*)`,
        total: sql<number>`sum(${expenses.amount})`
      })
      .from(expenses)
      .where(eq(expenses.userId, userId))
      .groupBy(sql`unnest(${expenses.tags})`)
      .orderBy(sql`count(*) desc`)

    return result
  }

  async getMonthlyStats(userId: string, year: number): Promise<MonthlyStats[]> {
    const result = await this.drizzleService.db
      .select({
        month: sql<number>`EXTRACT(MONTH FROM ${expenses.createdAt})`,
        count: sql<number>`count(*)`,
        total: sql<number>`sum(${expenses.amount})`
      })
      .from(expenses)
      .where(
        and(
          eq(expenses.userId, userId),
          sql`EXTRACT(YEAR FROM ${expenses.createdAt}) = ${year}`
        )
      )
      .groupBy(sql`EXTRACT(MONTH FROM ${expenses.createdAt})`)
      .orderBy(sql`EXTRACT(MONTH FROM ${expenses.createdAt})`)

    return result
  }
}
