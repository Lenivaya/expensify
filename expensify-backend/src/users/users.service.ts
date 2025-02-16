import { Injectable, NotFoundException } from '@nestjs/common'
import { or, eq, sql } from 'drizzle-orm'
// biome-ignore lint/style/useImportType: <explanation>
import { DrizzleService } from 'src/database/drizzle.service'
import { users } from 'src/database/schema/users.schema'
import { expenses } from 'src/database/schema/expenses.schema'
import { inflows } from 'src/database/schema/inflows.schema'
import type { UserUpdateDto } from './dto/user-update.dto'

@Injectable()
export class UsersService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async findById(id: string) {
    const [user] = await this.drizzleService.db
      .select()
      .from(users)
      .where(eq(users.id, id))
    return user
  }

  async findByLogin(login: string) {
    const [user] = await this.drizzleService.db
      .select()
      .from(users)
      .where(or(eq(users.email, login), eq(users.username, login)))
    return user
  }

  async findByEmail(email: string) {
    const [user] = await this.drizzleService.db
      .select()
      .from(users)
      .where(eq(users.email, email))
    return user
  }

  async updateUser(id: string, updatedUser: UserUpdateDto) {
    const updatedUsers = await this.drizzleService.db
      .update(users)
      .set(updatedUser)
      .where(eq(users.id, id))
      .returning()
    if (updatedUsers.length === 0) {
      throw new NotFoundException()
    }
    return updatedUsers.pop()
  }

  async deleteUser(id: string) {
    const deletedUsers = await this.drizzleService.db
      .delete(users)
      .where(eq(users.id, id))
      .returning()
    if (deletedUsers.length === 0) {
      throw new NotFoundException()
    }
  }

  async getCurrentBalance(userId: string) {
    const [result] = await this.drizzleService.db
      .select({
        totalInflows: sql<string>`COALESCE(SUM(${inflows.amount}), 0)`,
        totalExpenses: sql<string>`COALESCE(SUM(${expenses.amount}), 0)`,
        balance: sql<string>`COALESCE(SUM(${inflows.amount}), 0) - COALESCE(SUM(${expenses.amount}), 0)`
      })
      .from(users)
      .leftJoin(inflows, eq(inflows.userId, users.id))
      .leftJoin(expenses, eq(expenses.userId, users.id))
      .where(eq(users.id, userId))
      .groupBy(users.id)

    if (!result) {
      return {
        totalInflows: '0',
        totalExpenses: '0',
        balance: '0'
      }
    }

    return result
  }

  async getMonthlyBalance(userId: string, year: number) {
    const monthlyInflows = this.drizzleService.db
      .select({
        month: sql<number>`EXTRACT(MONTH FROM ${inflows.createdAt})`,
        total: sql<string>`COALESCE(SUM(${inflows.amount}), 0)`
      })
      .from(inflows)
      .where(
        sql`EXTRACT(YEAR FROM ${inflows.createdAt}) = ${year} AND ${inflows.userId} = ${userId}`
      )
      .groupBy(sql`EXTRACT(MONTH FROM ${inflows.createdAt})`)

    const monthlyExpenses = this.drizzleService.db
      .select({
        month: sql<number>`EXTRACT(MONTH FROM ${expenses.createdAt})`,
        total: sql<string>`COALESCE(SUM(${expenses.amount}), 0)`
      })
      .from(expenses)
      .where(
        sql`EXTRACT(YEAR FROM ${expenses.createdAt}) = ${year} AND ${expenses.userId} = ${userId}`
      )
      .groupBy(sql`EXTRACT(MONTH FROM ${expenses.createdAt})`)

    const [inflowsResult, expensesResult] = await Promise.all([
      monthlyInflows,
      monthlyExpenses
    ])

    const monthlyBalance = Array.from({ length: 12 }, (_, i) => i + 1).map(
      (month) => {
        const inflow = inflowsResult.find((r) => r.month === month)
        const expense = expensesResult.find((r) => r.month === month)

        return {
          month,
          inflow: inflow?.total || '0',
          expense: expense?.total || '0',
          balance: (
            Number(inflow?.total || 0) - Number(expense?.total || 0)
          ).toString()
        }
      }
    )

    return monthlyBalance
  }

  async getFinancialSummary(userId: string) {
    const [currentBalance, [averages]] = await Promise.all([
      this.getCurrentBalance(userId),
      this.drizzleService.db
        .select({
          avgInflow: sql<string>`AVG(${inflows.amount})`,
          avgExpense: sql<string>`AVG(${expenses.amount})`,
          inflowCount: sql<number>`COUNT(${inflows.id})`,
          expenseCount: sql<number>`COUNT(${expenses.id})`
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
        averageInflow: averages?.avgInflow || '0',
        averageExpense: averages?.avgExpense || '0',
        totalInflowCount: averages?.inflowCount || 0,
        totalExpenseCount: averages?.expenseCount || 0
      }
    }
  }

  async getTopTags(userId: string) {
    const inflowTags = this.drizzleService.db
      .select({
        tag: sql<string>`unnest(${inflows.tags})`,
        amount: sql<string>`SUM(${inflows.amount})`,
        type: sql<string>`'inflow'`
      })
      .from(inflows)
      .where(eq(inflows.userId, userId))
      .groupBy(sql`unnest(${inflows.tags})`)

    const expenseTags = this.drizzleService.db
      .select({
        tag: sql<string>`unnest(${expenses.tags})`,
        amount: sql<string>`SUM(${expenses.amount})`,
        type: sql<string>`'expense'`
      })
      .from(expenses)
      .where(eq(expenses.userId, userId))
      .groupBy(sql`unnest(${expenses.tags})`)

    const [inflowResults, expenseResults] = await Promise.all([
      inflowTags,
      expenseTags
    ])

    return {
      inflowTags: inflowResults.sort(
        (a, b) => Number(b.amount) - Number(a.amount)
      ),
      expenseTags: expenseResults.sort(
        (a, b) => Number(b.amount) - Number(a.amount)
      )
    }
  }

  async getBalanceHistory(userId: string) {
    const monthlyInflows = this.drizzleService.db
      .select({
        year: sql<number>`EXTRACT(YEAR FROM ${inflows.createdAt})`,
        month: sql<number>`EXTRACT(MONTH FROM ${inflows.createdAt})`,
        total: sql<string>`COALESCE(SUM(${inflows.amount}), 0)`
      })
      .from(inflows)
      .where(eq(inflows.userId, userId))
      .groupBy(
        sql`EXTRACT(YEAR FROM ${inflows.createdAt}), EXTRACT(MONTH FROM ${inflows.createdAt})`
      )
      .orderBy(
        sql`EXTRACT(YEAR FROM ${inflows.createdAt}), EXTRACT(MONTH FROM ${inflows.createdAt})`
      )

    const monthlyExpenses = this.drizzleService.db
      .select({
        year: sql<number>`EXTRACT(YEAR FROM ${expenses.createdAt})`,
        month: sql<number>`EXTRACT(MONTH FROM ${expenses.createdAt})`,
        total: sql<string>`COALESCE(SUM(${expenses.amount}), 0)`
      })
      .from(expenses)
      .where(eq(expenses.userId, userId))
      .groupBy(
        sql`EXTRACT(YEAR FROM ${expenses.createdAt}), EXTRACT(MONTH FROM ${expenses.createdAt})`
      )
      .orderBy(
        sql`EXTRACT(YEAR FROM ${expenses.createdAt}), EXTRACT(MONTH FROM ${expenses.createdAt})`
      )

    const [inflowsResult, expensesResult] = await Promise.all([
      monthlyInflows,
      monthlyExpenses
    ])

    // Create a map of all unique year-month combinations
    const periodMap = new Map<string, { year: number; month: number }>()
    for (const r of inflowsResult) {
      periodMap.set(`${r.year}-${r.month}`, { year: r.year, month: r.month })
    }
    for (const r of expensesResult) {
      periodMap.set(`${r.year}-${r.month}`, { year: r.year, month: r.month })
    }

    // Convert to array and sort by date
    const periods = Array.from(periodMap.values()).sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year
      return a.month - b.month
    })

    let cumulativeBalance = 0
    const balanceHistory = periods.map((period) => {
      const inflow = inflowsResult.find(
        (r) => r.year === period.year && r.month === period.month
      )
      const expense = expensesResult.find(
        (r) => r.year === period.year && r.month === period.month
      )

      const inflowAmount = Number(inflow?.total || 0)
      const expenseAmount = Number(expense?.total || 0)
      const balance = inflowAmount - expenseAmount
      cumulativeBalance += balance

      return {
        year: period.year,
        month: period.month,
        inflow: inflow?.total || '0',
        expense: expense?.total || '0',
        balance: balance.toString(),
        cumulativeBalance: cumulativeBalance.toString()
      }
    })

    return balanceHistory
  }
}
