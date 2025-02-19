import { faker } from '@faker-js/faker'
import chalk from 'chalk'
import { users } from '../src/database/schema/users.schema'
import { expenses } from '../src/database/schema/expenses.schema'
import { inflows } from '../src/database/schema/inflows.schema'
import { eq } from 'drizzle-orm'
import * as bcrypt from 'bcrypt'
import { drizzle } from 'drizzle-orm/node-postgres'
import { databaseSchema } from 'src/database/schema/database-schema'
import { Pool } from 'pg'
import 'dotenv/config'

const db = drizzle(
  new Pool({
    host: process.env.POSTGRES_HOST,
    port: Number.parseInt(process.env.POSTGRES_PORT ?? '') ?? 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
  }),
  { schema: databaseSchema }
)

// Configuration
const YEARS_RANGE = { start: 2020, end: 2025 }
const MONTHLY_EXPENSES_RANGE = { min: 15, max: 30 } // Number of expenses per month
const MONTHLY_INFLOWS_RANGE = { min: 1, max: 3 } // Number of inflows per month

// Expense categories with realistic patterns
const EXPENSE_CATEGORIES = [
  {
    category: 'Groceries',
    tags: ['food', 'groceries'],
    amountRange: { min: 50, max: 300 },
    frequency: 'weekly', // Weekly shopping
    variance: 0.2 // 20% variance in amounts
  },
  {
    category: 'Rent',
    tags: ['housing', 'rent'],
    amountRange: { min: 800, max: 2000 },
    frequency: 'monthly', // Monthly fixed payment
    variance: 0 // No variance - fixed amount
  },
  {
    category: 'Utilities',
    tags: ['utilities', 'bills'],
    amountRange: { min: 100, max: 400 },
    frequency: 'monthly',
    variance: 0.3, // Seasonal variation
    seasonal: true // Higher in summer/winter
  },
  {
    category: 'Transport',
    tags: ['transport', 'fuel'],
    amountRange: { min: 30, max: 150 },
    frequency: 'weekly',
    variance: 0.15
  },
  {
    category: 'Entertainment',
    tags: ['entertainment', 'leisure'],
    amountRange: { min: 20, max: 200 },
    frequency: 'random', // Random occurrences
    variance: 0.5
  },
  {
    category: 'Shopping',
    tags: ['shopping', 'clothes'],
    amountRange: { min: 50, max: 500 },
    frequency: 'monthly',
    variance: 0.4
  },
  {
    category: 'Healthcare',
    tags: ['health', 'medical'],
    amountRange: { min: 20, max: 500 },
    frequency: 'random',
    variance: 0.6
  },
  {
    category: 'Subscriptions',
    tags: ['subscriptions', 'services'],
    amountRange: { min: 10, max: 50 },
    frequency: 'monthly',
    variance: 0 // Fixed amounts
  },
  {
    category: 'Restaurants',
    tags: ['food', 'dining'],
    amountRange: { min: 15, max: 150 },
    frequency: 'weekly',
    variance: 0.3
  },
  {
    category: 'Insurance',
    tags: ['insurance', 'bills'],
    amountRange: { min: 50, max: 200 },
    frequency: 'monthly',
    variance: 0
  }
]

// Income sources with realistic patterns
const INCOME_SOURCES = [
  {
    source: 'Salary',
    tags: ['salary', 'main-income'],
    amountRange: { min: 3000, max: 6000 },
    frequency: 'monthly',
    variance: 0, // Fixed salary
    bonusMonths: [6, 12] // Bonus in June and December
  },
  {
    source: 'Freelance',
    tags: ['freelance', 'side-income'],
    amountRange: { min: 500, max: 2000 },
    frequency: 'random',
    variance: 0.7 // High variance in freelance income
  },
  {
    source: 'Investment',
    tags: ['investment', 'passive-income'],
    amountRange: { min: 100, max: 1000 },
    frequency: 'monthly',
    variance: 0.4,
    seasonal: true // Market fluctuations
  }
]

async function seedDatabase() {
  console.log(chalk.blue('🌱 Starting database seeding...'))

  try {
    // Check if user exists
    let user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.username, 'john.doe')
    })

    if (user) {
      console.log(
        chalk.yellow('\n⚠ User already exists. Cleaning up existing data...')
      )

      // Delete all existing inflows and expenses for this user
      await db.delete(inflows).where(eq(inflows.userId, user.id))
      await db.delete(expenses).where(eq(expenses.userId, user.id))

      console.log(chalk.green('✔ Existing data cleaned up'))
    } else {
      // Create new user
      const hashedPassword = await bcrypt.hash('password123', 10)
      const [newUser] = await db
        .insert(users)
        .values({
          username: 'john.doe',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password: hashedPassword
        })
        .returning()
      user = newUser
    }

    console.log(chalk.green('\n✔ Created user:'))
    console.log(
      chalk.cyan(
        JSON.stringify(
          {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          },
          null,
          2
        )
      )
    )

    // Generate data for each month in the date range
    for (let year = YEARS_RANGE.start; year <= YEARS_RANGE.end; year++) {
      for (let month = 0; month < 12; month++) {
        const currentDate = new Date(year, month)

        // Skip future months
        if (currentDate > new Date()) continue

        console.log(
          chalk.yellow(
            `\nGenerating data for ${chalk.bold(currentDate.toLocaleString('default', { month: 'long', year: 'numeric' }))}`
          )
        )

        // Generate monthly expenses
        const monthlyExpensesCount = faker.number.int({
          min: MONTHLY_EXPENSES_RANGE.min,
          max: MONTHLY_EXPENSES_RANGE.max
        })

        // Generate expenses based on category frequency
        const expensesPromises = EXPENSE_CATEGORIES.flatMap((category) => {
          const entries: Promise<any>[] = []
          const daysInMonth = new Date(year, month + 1, 0).getDate()

          // Calculate base number of entries based on frequency
          let numberOfEntries = 1
          switch (category.frequency) {
            case 'weekly':
              numberOfEntries = 4 // roughly 4 weeks per month
              break
            case 'monthly':
              numberOfEntries = 1
              break
            case 'random':
              numberOfEntries = faker.number.int({ min: 0, max: 3 })
              break
          }

          // Apply seasonal variation if applicable
          if (category.seasonal) {
            // Increase frequency in summer (months 5-8) and winter (months 11-2)
            const isSeason =
              (month >= 5 && month <= 8) || month >= 11 || month <= 2
            numberOfEntries = isSeason
              ? Math.ceil(numberOfEntries * 1.5)
              : numberOfEntries
          }

          // Generate entries
          for (let i = 0; i < numberOfEntries; i++) {
            const baseAmount = faker.number.float({
              min: category.amountRange.min,
              max: category.amountRange.max,
              fractionDigits: 2
            })

            // Apply variance to amount
            const variance = category.variance ?? 0
            const varianceFactor =
              1 + faker.number.float({ min: -variance, max: variance })
            const amount = (baseAmount * varianceFactor).toFixed(2)

            // Generate appropriate date based on frequency
            let createdAt: Date
            if (category.frequency === 'monthly') {
              // Fixed expenses typically occur at the start of the month
              createdAt = new Date(
                year,
                month,
                faker.number.int({ min: 1, max: 5 })
              )
            } else if (category.frequency === 'weekly') {
              // Weekly expenses spread across the month
              const week = Math.floor((i / numberOfEntries) * 4)
              createdAt = new Date(
                year,
                month,
                week * 7 + faker.number.int({ min: 1, max: 7 })
              )
            } else {
              // Random dates for other frequencies
              createdAt = faker.date.between({
                from: new Date(year, month, 1),
                to: new Date(year, month, daysInMonth)
              })
            }

            entries.push(
              db.insert(expenses).values({
                userId: user.id,
                amount: amount.toString(),
                description: `${category.category}: ${
                  category.frequency === 'monthly'
                    ? `Monthly ${category.category.toLowerCase()}`
                    : faker.commerce.productName()
                }`,
                tags: category.tags,
                createdAt
              })
            )
          }

          return entries
        })

        // Generate monthly inflows
        const monthlyInflowsCount = faker.number.int({
          min: MONTHLY_INFLOWS_RANGE.min,
          max: MONTHLY_INFLOWS_RANGE.max
        })

        // Generate inflows based on source patterns
        const inflowsPromises = INCOME_SOURCES.flatMap((source) => {
          const entries: Promise<any>[] = []

          // Base amount calculation
          let baseAmount = faker.number.float({
            min: source.amountRange.min,
            max: source.amountRange.max,
            fractionDigits: 2
          })

          // Apply variance
          const variance = source.variance ?? 0
          const varianceFactor =
            1 + faker.number.float({ min: -variance, max: variance })
          baseAmount *= varianceFactor

          // Handle seasonal variations
          if (source.seasonal) {
            // Better market conditions in certain months
            const seasonalFactor = [3, 4, 8, 9].includes(month) ? 1.2 : 1
            baseAmount *= seasonalFactor
          }

          // Handle bonus months for salary
          if (
            source.source === 'Salary' &&
            source.bonusMonths?.includes(month + 1)
          ) {
            // Add bonus (1-3 months of salary)
            const bonusAmount =
              baseAmount *
              faker.number.float({ min: 1, max: 3, fractionDigits: 2 })
            entries.push(
              db.insert(inflows).values({
                userId: user.id,
                amount: bonusAmount.toFixed(2),
                description: `${source.source}: Annual bonus payment`,
                tags: [...source.tags, 'bonus'],
                createdAt: new Date(
                  year,
                  month,
                  faker.number.int({ min: 1, max: 5 })
                )
              })
            )
          }

          // Regular income entry
          if (
            source.frequency === 'monthly' ||
            faker.number.int({ min: 0, max: 2 }) > 0
          ) {
            entries.push(
              db.insert(inflows).values({
                userId: user.id,
                amount: baseAmount.toFixed(2),
                description: `${source.source}: ${
                  source.frequency === 'monthly'
                    ? `Monthly ${source.source.toLowerCase()}`
                    : faker.finance.transactionDescription()
                }`,
                tags: source.tags,
                createdAt: new Date(
                  year,
                  month,
                  faker.number.int({ min: 1, max: 5 })
                )
              })
            )
          }

          return entries
        })

        await Promise.all([...expensesPromises, ...inflowsPromises])

        process.stdout.write(chalk.green('✔'))
      }
    }

    console.log(chalk.green('\n\n✨ Database seeding completed successfully!'))
  } catch (error) {
    console.error(chalk.red('\n❌ Error seeding database:'), error)
    throw error
  }
}

// Run the seed function
seedDatabase().catch((error) => {
  console.error(chalk.red('Fatal error:'), error)
  process.exit(1)
})
