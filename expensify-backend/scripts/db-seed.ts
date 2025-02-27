import { seed } from 'drizzle-seed'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import 'dotenv/config'
import { databaseSchema } from '../src/database/schema/database.schema'
import * as bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'

const { users, expenses, inflows } = databaseSchema

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

async function seedDatabase() {
  console.log('🌱 Starting database seeding...')

  try {
    // Get or create user
    let user = await db.query.users.findFirst({
      where: eq(users.username, 'john.doe')
    })

    if (!user) {
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

    // Clean only transactions
    await Promise.all([
      db.delete(expenses).where(eq(expenses.userId, user.id)),
      db.delete(inflows).where(eq(inflows.userId, user.id))
    ])

    // Use drizzle-seed for generating consistent test data
    await seed(db, { expenses, inflows }).refine((f) => ({
      expenses: {
        count: 1200, // About 25 transactions per month
        columns: {
          userId: f.default({ defaultValue: user.id }),
          amount: f.weightedRandom([
            // Daily expenses (coffee, lunch, transport) ~$10-30
            {
              weight: 0.4,
              value: f.number({ minValue: 10, maxValue: 30, precision: 100 })
            },
            // Weekly expenses (groceries, fuel) ~$50-150
            {
              weight: 0.35,
              value: f.number({ minValue: 50, maxValue: 150, precision: 100 })
            },
            // Monthly bills (utilities, subscriptions) ~$100-300
            {
              weight: 0.2,
              value: f.number({ minValue: 100, maxValue: 300, precision: 100 })
            },
            // Occasional large expenses (rent, repairs) ~$500-1200
            {
              weight: 0.05,
              value: f.number({ minValue: 500, maxValue: 1200, precision: 100 })
            }
          ]),
          description: f.loremIpsum({ sentencesCount: 1 }),
          tags: f.valuesFromArray({
            values: [
              'housing',
              'rent',
              'food',
              'groceries',
              'utilities',
              'bills',
              'transport',
              'fuel',
              'entertainment',
              'leisure'
            ],
            arraySize: 2
          }),
          createdAt: f.date({
            minDate: '2020-01-01',
            maxDate: '2024-12-31'
          })
        }
      },
      inflows: {
        count: 48, // Just monthly salary (48 months)
        columns: {
          userId: f.default({ defaultValue: user.id }),
          amount: f.weightedRandom([
            // Regular monthly salary
            {
              weight: 0.8,
              value: f.number({
                minValue: 3000,
                maxValue: 3200,
                precision: 100
              })
            },
            // Months with bonus
            {
              weight: 0.2,
              value: f.number({
                minValue: 3500,
                maxValue: 4000,
                precision: 100
              })
            }
          ]),
          description: f.valuesFromArray({
            values: ['Monthly Salary', 'Salary + Quarterly Bonus']
          }),
          tags: f.default({ defaultValue: ['salary', 'main-income'] }),
          createdAt: f.date({
            minDate: '2020-01-01',
            maxDate: '2024-12-31'
          })
        }
      }
    }))

    console.log('✨ Database seeding completed successfully!')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  }
}

seedDatabase().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
