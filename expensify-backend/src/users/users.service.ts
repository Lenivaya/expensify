import {
  Injectable,
  NotFoundException,
  BadRequestException
} from '@nestjs/common'
import { or, eq, sql, lte, and, sum, count, avg } from 'drizzle-orm'
import { DrizzleService } from 'src/database/drizzle.service'
import { users } from 'src/database/schema/users.schema'
import { expenses } from 'src/database/schema/expenses.schema'
import { inflows } from 'src/database/schema/inflows.schema'
import type { UserUpdateDto } from './dto/user-update.dto'
import { BalanceHistoryItemDto } from './dto/balance-history.dto'
import { Cache } from 'cache-manager'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject } from '@nestjs/common'
import { FinancialSummaryDto } from './dto/financial-summary.dto'
import { BalanceDto } from './dto/balance.dto'

/**
 * Service responsible for handling user-related business logic in the Expensify application.
 *
 * This service provides methods for managing user profiles and retrieving financial data
 * associated with users, including balance information, financial summaries, and transaction statistics.
 * It implements caching strategies to optimize performance for frequently accessed data.
 */
@Injectable()
export class UsersService {
  /**
   * Cache key constants used for storing and retrieving cached data.
   * These keys are used as part of the cache key generation to ensure unique cache entries.
   */
  private static readonly CACHE_KEYS = {
    PROFILE: 'profile',
    BALANCE: 'balance',
    MONTHLY: 'monthly',
    TAGS: 'tags',
    HISTORY: 'history'
  } as const

  /**
   * Default cache time-to-live in seconds.
   * Cached data will expire after this duration.
   */
  private readonly CACHE_TTL = 300 // 5 minutes in seconds

  /**
   * Prefix used for all user-related cache keys to avoid collisions with other cached data.
   */
  private readonly CACHE_PREFIX = 'user:'

  /**
   * Creates an instance of the UsersService.
   *
   * @param drizzleService - Service for database operations using Drizzle ORM
   * @param cacheManager - Cache manager for storing and retrieving cached data
   */
  constructor(
    private readonly drizzleService: DrizzleService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  /**
   * Generates a cache key for a specific user and data type.
   *
   * @param key - The type of data being cached (e.g., 'profile', 'balance')
   * @param userId - The ID of the user the data belongs to
   * @param suffix - Optional additional identifier for the cached data
   * @returns A unique cache key string
   */
  private getCacheKey(key: string, userId: string, suffix?: string): string {
    return `${this.CACHE_PREFIX}${userId}:${key}${suffix ? `:${suffix}` : ''}`
  }

  /**
   * Retrieves data from cache if available, or fetches it using the provided function and caches it.
   *
   * @param key - The type of data being cached
   * @param userId - The ID of the user the data belongs to
   * @param fetchData - Function to fetch the data if not found in cache
   * @param suffix - Optional additional identifier for the cached data
   * @returns The requested data, either from cache or freshly fetched
   */
  private async getCachedData<T>(
    key: string,
    userId: string,
    fetchData: () => Promise<T>,
    suffix?: string
  ): Promise<T> {
    const cacheKey = this.getCacheKey(key, userId, suffix)
    const cachedData = await this.cacheManager.get<T>(cacheKey)
    if (cachedData) {
      return cachedData
    }

    const data = await fetchData()
    await this.cacheManager.set(cacheKey, data, this.CACHE_TTL)
    return data
  }

  /**
   * Invalidates all cached data for a specific user.
   * This should be called whenever user data is modified to ensure fresh data is fetched.
   *
   * @param userId - The ID of the user whose cache should be invalidated
   */
  async invalidateUserStatsCache(userId: string) {
    const keys = Object.values(UsersService.CACHE_KEYS)
    await Promise.all(
      keys.map((key) => this.cacheManager.del(this.getCacheKey(key, userId)))
    )
  }

  /**
   * Finds a user by their ID.
   *
   * @param id - The ID of the user to find
   * @returns The user object if found, or undefined if not found
   */
  async findById(id: string) {
    return this.getCachedData(UsersService.CACHE_KEYS.PROFILE, id, async () => {
      const [user] = await this.drizzleService.db
        .select()
        .from(users)
        .where(eq(users.id, id))
      return user
    })
  }

  /**
   * Finds a user by their login (either email or username).
   *
   * @param login - The email or username to search for
   * @returns The user object if found, or undefined if not found
   */
  async findByLogin(login: string) {
    const [user] = await this.drizzleService.db
      .select()
      .from(users)
      .where(or(eq(users.email, login), eq(users.username, login)))
    return user
  }

  /**
   * Finds a user by their email address.
   *
   * @param email - The email address to search for
   * @returns The user object if found, or undefined if not found
   */
  async findByEmail(email: string) {
    const [user] = await this.drizzleService.db
      .select()
      .from(users)
      .where(eq(users.email, email))
    return user
  }

  /**
   * Updates a user's profile information.
   *
   * @param id - The ID of the user to update
   * @param updatedUser - The new user data to apply
   * @returns The updated user object
   * @throws NotFoundException if the user is not found
   */
  async updateUser(id: string, updatedUser: UserUpdateDto) {
    const updatedUsers = await this.drizzleService.db
      .update(users)
      .set(updatedUser)
      .where(eq(users.id, id))
      .returning()

    if (updatedUsers.length === 0) {
      throw new NotFoundException('User not found')
    }

    const user = updatedUsers[0]
    // Clear user-related caches
    await this.cacheManager.del(
      this.getCacheKey(UsersService.CACHE_KEYS.PROFILE, id)
    )
    await this.cacheManager.del(
      this.getCacheKey(UsersService.CACHE_KEYS.BALANCE, id)
    )
    await this.cacheManager.del(
      this.getCacheKey(UsersService.CACHE_KEYS.MONTHLY, id)
    )
    await this.cacheManager.del(
      this.getCacheKey(UsersService.CACHE_KEYS.TAGS, id)
    )
    await this.cacheManager.del(
      this.getCacheKey(UsersService.CACHE_KEYS.HISTORY, id)
    )
    return user
  }

  /**
   * Deletes a user account.
   *
   * @param id - The ID of the user to delete
   * @throws NotFoundException if the user is not found
   */
  async deleteUser(id: string) {
    const deletedUsers = await this.drizzleService.db
      .delete(users)
      .where(eq(users.id, id))
      .returning()

    if (deletedUsers.length === 0) {
      throw new NotFoundException('User not found')
    }

    // Clear all user-related cache
    await this.cacheManager.del(
      this.getCacheKey(UsersService.CACHE_KEYS.PROFILE, id)
    )
    await this.cacheManager.del(
      this.getCacheKey(UsersService.CACHE_KEYS.BALANCE, id)
    )
    await this.cacheManager.del(
      this.getCacheKey(UsersService.CACHE_KEYS.MONTHLY, id)
    )
    await this.cacheManager.del(
      this.getCacheKey(UsersService.CACHE_KEYS.TAGS, id)
    )
    await this.cacheManager.del(
      this.getCacheKey(UsersService.CACHE_KEYS.HISTORY, id)
    )
  }

  /**
   * Retrieves the current balance for a user.
   *
   * @param userId - The ID of the user to get the balance for
   * @returns A BalanceDto containing total inflows, expenses, and net balance
   */
  async getCurrentBalance(userId: string): Promise<BalanceDto> {
    return this.getCachedData(
      UsersService.CACHE_KEYS.BALANCE,
      userId,
      async () => {
        const [{ totalInflows }] = await this.drizzleService.db
          .select({
            totalInflows: sum(inflows.amount).mapWith(Number)
          })
          .from(inflows)
          .where(eq(inflows.userId, userId))
        const [{ totalExpenses }] = await this.drizzleService.db
          .select({
            totalExpenses: sum(expenses.amount).mapWith(Number)
          })
          .from(expenses)
          .where(eq(expenses.userId, userId))

        return {
          totalInflows: Number(totalInflows ?? 0),
          totalExpenses: Number(totalExpenses ?? 0),
          balance: Number((totalInflows ?? 0) - (totalExpenses ?? 0))
        }
      }
    )
  }

  /**
   * Retrieves the monthly balance breakdown for a specific year.
   *
   * @param userId - The ID of the user to get the monthly balance for
   * @param year - The year for which to retrieve monthly balance data
   * @returns An array of monthly balance records for the specified year
   */
  async getMonthlyBalance(userId: string, year: number) {
    const cacheKey = this.getCacheKey(
      UsersService.CACHE_KEYS.MONTHLY,
      userId,
      year.toString()
    )
    const cachedBalance = await this.cacheManager.get(cacheKey)
    if (cachedBalance) {
      return cachedBalance
    }

    const monthlyInflowsQuery = this.drizzleService.db
      .select({
        month: sql<number>`EXTRACT(MONTH FROM ${inflows.createdAt})::int`,
        total: sum(inflows.amount).mapWith(Number)
      })
      .from(inflows)
      .where(
        and(
          sql`EXTRACT(YEAR FROM ${inflows.createdAt}) = ${year}`,
          eq(inflows.userId, userId)
        )
      )
      .groupBy(sql`EXTRACT(MONTH FROM ${inflows.createdAt})::int`)
    const monthlyExpensesQuery = this.drizzleService.db
      .select({
        month: sql<number>`EXTRACT(MONTH FROM ${expenses.createdAt})::int`,
        total: sum(expenses.amount).mapWith(Number)
      })
      .from(expenses)
      .where(
        and(
          sql`EXTRACT(YEAR FROM ${expenses.createdAt}) = ${year}`,
          eq(expenses.userId, userId)
        )
      )
      .groupBy(sql`EXTRACT(MONTH FROM ${expenses.createdAt})::int`)

    const [inflowsResult, expensesResult] = await Promise.all([
      monthlyInflowsQuery,
      monthlyExpensesQuery
    ])

    const monthlyBalance = Array.from({ length: 12 }, (_, index) => {
      const month = index + 1
      const inflowObj = inflowsResult.find((item) => item.month === month)
      const expenseObj = expensesResult.find((item) => item.month === month)
      const inflow = inflowObj ? Number(inflowObj.total) : 0
      const expense = expenseObj ? Number(expenseObj.total) : 0
      return {
        month,
        inflow: inflow.toFixed(2),
        expense: expense.toFixed(2),
        balance: (inflow - expense).toFixed(2)
      }
    })

    await this.cacheManager.set(cacheKey, monthlyBalance, this.CACHE_TTL)
    return monthlyBalance
  }

  /**
   * Retrieves a comprehensive financial summary for a user.
   *
   * @param userId - The ID of the user to get the financial summary for
   * @returns A FinancialSummaryDto containing current balance and statistical analysis
   */
  async getFinancialSummary(userId: string): Promise<FinancialSummaryDto> {
    const [currentBalance, [inflowCount], [expenseCount], [statistics]] =
      await Promise.all([
        this.getCurrentBalance(userId),
        this.drizzleService.db
          .select({
            totalInflowCount: count(inflows.id)
          })
          .from(inflows)
          .where(eq(inflows.userId, userId)),
        this.drizzleService.db
          .select({
            totalExpenseCount: count(expenses.id)
          })
          .from(expenses)
          .where(eq(expenses.userId, userId)),
        this.drizzleService.db
          .select({
            averageInflow: avg(inflows.amount).mapWith(Number),
            averageExpense: avg(expenses.amount).mapWith(Number),
            averageMonthlyInflow: sql<number>`ROUND(COALESCE(
            (
              SELECT AVG(monthly_total)
              FROM (
                SELECT
                  SUM(amount) as monthly_total
                FROM ${inflows}
                WHERE user_id = ${users.id}
                GROUP BY DATE_TRUNC('month', created_at)
              ) t
              WHERE monthly_total > 0
            ),
            0
          ), 2)`,
            averageMonthlyExpense: sql<number>`ROUND(COALESCE(
            (
              SELECT AVG(monthly_total)
              FROM (
                SELECT
                  SUM(amount) as monthly_total
                FROM ${expenses}
                WHERE user_id = ${users.id}
                GROUP BY DATE_TRUNC('month', created_at)
              ) t
              WHERE monthly_total > 0
            ),
            0
          ), 2)`
          })
          .from(users)
          .leftJoin(inflows, eq(inflows.userId, users.id))
          .leftJoin(expenses, eq(expenses.userId, users.id))
          .where(eq(users.id, userId))
          .limit(1)
          .groupBy(users.id)
      ])

    return {
      currentBalance,
      statistics: {
        averageInflow: Number(statistics?.averageInflow ?? 0),
        averageExpense: Number(statistics?.averageExpense ?? 0),
        averageMonthlyInflow: Number(statistics?.averageMonthlyInflow ?? 0),
        averageMonthlyExpense: Number(statistics?.averageMonthlyExpense ?? 0),
        totalInflowCount: Number(inflowCount?.totalInflowCount ?? 0),
        totalExpenseCount: Number(expenseCount?.totalExpenseCount ?? 0)
      }
    }
  }

  /**
   * Retrieves a summary of the top tags used by a user.
   *
   * @param userId - The ID of the user to get the tag summary for
   * @returns An object containing arrays of top inflow and expense tags with amounts
   */
  async getTopTags(userId: string) {
    const cacheKey = this.getCacheKey(UsersService.CACHE_KEYS.TAGS, userId)
    const cachedTags = await this.cacheManager.get(cacheKey)
    if (cachedTags) {
      return cachedTags
    }

    const inflowTags = this.drizzleService.db
      .select({
        tag: sql<string>`unnest(${inflows.tags})`,
        amount: sum(inflows.amount).mapWith(Number),
        type: sql<string>`'inflow'`
      })
      .from(inflows)
      .where(eq(inflows.userId, userId))
      .groupBy(sql`unnest(${inflows.tags})`)

    const expenseTags = this.drizzleService.db
      .select({
        tag: sql<string>`unnest(${expenses.tags})`,
        amount: sum(expenses.amount).mapWith(Number),
        type: sql<string>`'expense'`
      })
      .from(expenses)
      .where(eq(expenses.userId, userId))
      .groupBy(sql`unnest(${expenses.tags})`)

    const [inflowResults, expenseResults] = await Promise.all([
      inflowTags,
      expenseTags
    ])

    const result = {
      inflowTags: inflowResults.sort(
        (a, b) => Number(b.amount) - Number(a.amount)
      ),
      expenseTags: expenseResults.sort(
        (a, b) => Number(b.amount) - Number(a.amount)
      )
    }

    await this.cacheManager.set(cacheKey, result, this.CACHE_TTL)
    return result
  }

  /**
   * Retrieves the complete balance history for a user.
   *
   * @param userId - The ID of the user to get the balance history for
   * @returns An array of balance history records with cumulative totals
   */
  async getBalanceHistory(userId: string): Promise<BalanceHistoryItemDto[]> {
    const cacheKey = this.getCacheKey(UsersService.CACHE_KEYS.HISTORY, userId)
    const cachedHistory = await this.cacheManager.get(cacheKey)
    if (cachedHistory) {
      return cachedHistory as BalanceHistoryItemDto[]
    }

    const db = this.drizzleService.db

    // Fetch monthly inflows
    const monthlyInflows = await db
      .select({
        year: sql<number>`EXTRACT(YEAR FROM ${inflows.createdAt})::int`,
        month: sql<number>`EXTRACT(MONTH FROM ${inflows.createdAt})::int`,
        total: sum(inflows.amount).mapWith(Number)
      })
      .from(inflows)
      .where(eq(inflows.userId, userId))
      .groupBy(
        sql`EXTRACT(YEAR FROM ${inflows.createdAt})::int, EXTRACT(MONTH FROM ${inflows.createdAt})::int`
      )
      .orderBy(
        sql`EXTRACT(YEAR FROM ${inflows.createdAt})::int`,
        sql`EXTRACT(MONTH FROM ${inflows.createdAt})::int`
      )

    // Fetch monthly expenses
    const monthlyExpenses = await db
      .select({
        year: sql<number>`EXTRACT(YEAR FROM ${expenses.createdAt})::int`,
        month: sql<number>`EXTRACT(MONTH FROM ${expenses.createdAt})::int`,
        total: sum(expenses.amount).mapWith(Number)
      })
      .from(expenses)
      .where(eq(expenses.userId, userId))
      .groupBy(
        sql`EXTRACT(YEAR FROM ${expenses.createdAt})::int, EXTRACT(MONTH FROM ${expenses.createdAt})::int`
      )
      .orderBy(
        sql`EXTRACT(YEAR FROM ${expenses.createdAt})::int`,
        sql`EXTRACT(MONTH FROM ${expenses.createdAt})::int`
      )

    const periodMap = new Map<
      string,
      {
        year: number
        month: number
        inflow: number
        expense: number
      }
    >()

    for (const inflow of monthlyInflows) {
      const key = `${inflow.year}-${inflow.month}`
      const existing = periodMap.get(key)
      if (existing) {
        existing.inflow = Number(inflow.total)
      } else {
        periodMap.set(key, {
          year: inflow.year,
          month: inflow.month,
          inflow: Number(inflow.total),
          expense: 0
        })
      }
    }

    for (const expense of monthlyExpenses) {
      const key = `${expense.year}-${expense.month}`
      const existing = periodMap.get(key)
      if (existing) {
        existing.expense = Number(expense.total)
      } else {
        periodMap.set(key, {
          year: expense.year,
          month: expense.month,
          inflow: 0,
          expense: Number(expense.total)
        })
      }
    }

    let cumulativeBalance = 0
    const balanceHistory = Array.from(periodMap.values())
      .sort((a, b) => a.year - b.year || a.month - b.month)
      .map((period) => {
        const inflow = period.inflow ?? 0
        const expense = period.expense ?? 0
        const balance = inflow - expense
        cumulativeBalance += balance

        return {
          year: period.year,
          month: period.month,
          inflow: inflow.toFixed(2),
          expense: expense.toFixed(2),
          balance: balance.toFixed(2),
          cumulativeBalance: cumulativeBalance.toFixed(2)
        }
      })

    await this.cacheManager.set(cacheKey, balanceHistory, this.CACHE_TTL)
    return balanceHistory
  }
}
