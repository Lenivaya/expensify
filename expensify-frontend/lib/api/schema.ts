/**
 * This file was auto-generated by @openapi-qraft/cli.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/auth/sign-in': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get?: never
    put?: never
    /**
     * Sign in a user
     * @description This endpoint allows a user to sign in by providing valid credentials. On successful authentication, a token is generated and returned.
     */
    post: operations['AuthController_signIn']
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/auth/sign-up': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get?: never
    put?: never
    /**
     * Sign up a new user
     * @description This endpoint allows a new user to sign up by providing necessary registration details. On successful registration, user details are returned.
     */
    post: operations['AuthController_signUp']
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/auth/me': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    /**
     * Get current user
     * @description This endpoint returns the current authenticated user.
     */
    get: operations['AuthController_getMe']
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/users/{id}': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get?: never
    put?: never
    post?: never
    /**
     * Deletes user
     * @description Deletes a user account. This operation cannot be undone.
     */
    delete: operations['UsersController_deleteUser']
    options?: never
    head?: never
    /**
     * Updates user
     * @description This endpoint allows the user to update their details. Note that this requires authentication of user you are updating.
     */
    patch: operations['UsersController_updateUser']
    trace?: never
  }
  '/users/{id}/balance': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    /**
     * Get current balance
     * @description Get user's current balance including total inflows and expenses
     */
    get: operations['UsersController_getCurrentBalance']
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/users/{id}/monthly-balance/{year}': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    /**
     * Get monthly balance
     * @description Get user's monthly balance breakdown for a specific year
     */
    get: operations['UsersController_getMonthlyBalance']
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/users/{id}/financial-summary': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    /**
     * Get financial summary
     * @description Get comprehensive financial summary including balance and statistics
     */
    get: operations['UsersController_getFinancialSummary']
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/users/{id}/top-tags': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    /**
     * Get top tags
     * @description Get summary of top tags for both inflows and expenses
     */
    get: operations['UsersController_getTopTags']
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/expenses': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    /**
     * Get all expenses
     * @description Retrieve all expenses for the authenticated user with pagination and filtering options
     */
    get: operations['ExpensesController_findAll']
    put?: never
    /**
     * Create expense
     * @description Create a new expense for the authenticated user
     */
    post: operations['ExpensesController_create']
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/expenses/{id}': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    /**
     * Get expense by ID
     * @description Retrieve a specific expense by its ID
     */
    get: operations['ExpensesController_findOne']
    /**
     * Update expense
     * @description Update an existing expense by ID
     */
    put: operations['ExpensesController_update']
    post?: never
    /**
     * Delete expense
     * @description Delete an expense by ID
     */
    delete: operations['ExpensesController_remove']
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/expenses/stats/total': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    /**
     * Get total spent
     * @description Get the total amount spent across all expenses
     */
    get: operations['ExpensesController_getTotalSpent']
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/expenses/stats/tags': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    /**
     * Get tag statistics
     * @description Get statistics about expense tags including count and total amount
     */
    get: operations['ExpensesController_getTagStats']
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/expenses/stats/monthly/{year}': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    /**
     * Get monthly statistics
     * @description Get monthly expense statistics for a specific year
     */
    get: operations['ExpensesController_getMonthlyStats']
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/inflows': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    /**
     * Get all inflows
     * @description Retrieve all inflows for the authenticated user with pagination and filtering options
     */
    get: operations['InflowsController_findAll']
    put?: never
    /**
     * Create inflow
     * @description Create a new inflow for the authenticated user
     */
    post: operations['InflowsController_create']
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/inflows/{id}': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    /**
     * Get inflow by ID
     * @description Retrieve a specific inflow by its ID
     */
    get: operations['InflowsController_findOne']
    put?: never
    post?: never
    /**
     * Delete inflow
     * @description Delete an inflow by ID
     */
    delete: operations['InflowsController_remove']
    options?: never
    head?: never
    /**
     * Update inflow
     * @description Partially update an existing inflow by ID
     */
    patch: operations['InflowsController_update']
    trace?: never
  }
  '/inflows/stats/total': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    /**
     * Get total inflow
     * @description Get the total amount received across all inflows
     */
    get: operations['InflowsController_getTotalInflow']
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/inflows/stats/tags': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    /**
     * Get tag statistics
     * @description Get statistics about inflow tags including count and total amount
     */
    get: operations['InflowsController_getTagStats']
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/inflows/stats/monthly/{year}': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    /**
     * Get monthly statistics
     * @description Get monthly inflow statistics for a specific year
     */
    get: operations['InflowsController_getMonthlyStats']
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
}
export type webhooks = Record<string, never>
export interface components {
  schemas: {
    SignInDto: {
      /**
       * @description Login of the user, could be either his email or username
       * @example user@example.com
       */
      login: string
      /**
       * @description The password of the user
       * @example z1Tlxb1tuXH7
       */
      password: string
    }
    SignInResponseDto: {
      /**
       * @description The access token for the user
       * @example eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
       */
      accessToken: string
      /**
       * @description The refresh token for the user
       * @example dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4gZXhhbXBsZQ==
       */
      refreshToken: string
    }
    SignUpDto: {
      /**
       * @description Username of the user
       * @example johnydoe
       */
      username: string
      /**
       * @description First name of the new user
       * @example John
       */
      firstName: string
      /**
       * @description Last name of the new user
       * @example Doe
       */
      lastName: string
      /**
       * Format: email
       * @description Email of the new user
       * @example user@example.com
       */
      email: string
      /**
       * @description Password of the new user
       * @example z1Tlxb1tuXH7
       */
      password: string
    }
    SignUpResponseDto: {
      /** @description Unique identifier of the user */
      id: string
      /** @description Email of the user */
      email: string
    }
    UserDto: {
      /** Format: uuid */
      id: string
      username: string
      firstName: string | null
      lastName: string | null
      email: string
      updatedAt: unknown
      createdAt: unknown
      deletedAt: unknown
    }
    UserUpdateDto: {
      /**
       * @description Username of the user to update
       * @example johnydoe
       */
      username?: string
      /**
       * @description First name of the user to update
       * @example John
       */
      firstName?: string
      /**
       * @description Last name of the user to update
       * @example Doe
       */
      lastName?: string
    }
    BalanceDto: {
      /**
       * @description Total amount of all inflows
       * @example 5000.00
       */
      totalInflows: string
      /**
       * @description Total amount of all expenses
       * @example 3000.00
       */
      totalExpenses: string
      /**
       * @description Current balance (inflows - expenses)
       * @example 2000.00
       */
      balance: string
    }
    MonthlyBalanceDto: {
      /**
       * @description Month number (1-12)
       * @example 1
       */
      month: number
      /**
       * @description Total inflows for the month
       * @example 1000.00
       */
      inflow: string
      /**
       * @description Total expenses for the month
       * @example 800.00
       */
      expense: string
      /**
       * @description Balance for the month
       * @example 200.00
       */
      balance: string
    }
    FinancialStatisticsDto: {
      /**
       * @description Average amount of inflows
       * @example 1000.00
       */
      averageInflow: string
      /**
       * @description Average amount of expenses
       * @example 800.00
       */
      averageExpense: string
      /**
       * @description Total number of inflow transactions
       * @example 25
       */
      totalInflowCount: number
      /**
       * @description Total number of expense transactions
       * @example 50
       */
      totalExpenseCount: number
    }
    FinancialSummaryDto: {
      currentBalance: components['schemas']['BalanceDto']
      statistics: components['schemas']['FinancialStatisticsDto']
    }
    TagSummaryItemDto: {
      /**
       * @description Tag name
       * @example groceries
       */
      tag: string
      /**
       * @description Total amount for this tag
       * @example 500.00
       */
      amount: string
      /**
       * @description Type of transaction
       * @example expense
       * @enum {string}
       */
      type: 'inflow' | 'expense'
    }
    TagSummaryDto: {
      /** @description Top inflow tags with amounts */
      inflowTags: components['schemas']['TagSummaryItemDto'][]
      /** @description Top expense tags with amounts */
      expenseTags: components['schemas']['TagSummaryItemDto'][]
    }
    CreateExpenseDto: {
      /**
       * @description Amount spent
       * @example 29.99
       */
      amount: number
      /**
       * @description Description of the expense
       * @example Grocery shopping
       */
      description: string
      /**
       * @description Tags for categorizing the expense
       * @example [
       *       "food",
       *       "groceries"
       *     ]
       */
      tags: string[]
    }
    ExpenseDto: {
      /** Format: uuid */
      id: string
      amount: string
      description: string | null
      tags: string[]
      /** Format: uuid */
      userId: string
      updatedAt: unknown
      createdAt: unknown
      deletedAt: unknown
    }
    MetaSearchInfo: {
      /** @description Page */
      page: number
      /** @description Limit */
      limit: number
      /**
       * @description Total found
       * @default 10
       */
      total: number
      /**
       * @description Number of pages
       * @default 1
       */
      pageCount: number
    }
    ExpenseSearchDto: {
      /** @description List of expenses found */
      data: components['schemas']['ExpenseDto'][]
      /** @description Meta information about search results */
      meta: components['schemas']['MetaSearchInfo']
    }
    UpdateExpenseDto: {
      /**
       * @description Amount spent
       * @example 29.99
       */
      amount?: number
      /**
       * @description Description of the expense
       * @example Grocery shopping
       */
      description?: string
      /**
       * @description Tags for categorizing the expense
       * @example [
       *       "food",
       *       "groceries"
       *     ]
       */
      tags?: string[]
    }
    TagStatistics: {
      /** @description Tag */
      tag: string
      /** @description Count of times tag appears in dataset */
      count: number
      /** @description Total value related to this tag */
      total: number
    }
    MonthlyStats: {
      /** @description Month */
      month: number
      /** @description Count of times some thing appears per month */
      count: number
      /** @description Total value related to this month */
      total: number
    }
    CreateInflowDto: {
      /**
       * @description Amount received
       * @example 2500
       */
      amount: number
      /**
       * @description Description of the inflow
       * @example Monthly salary
       */
      description: string
      /**
       * @description Tags for categorizing the inflow
       * @example [
       *       "salary",
       *       "work"
       *     ]
       */
      tags: string[]
    }
    InflowDto: {
      /** Format: uuid */
      id: string
      amount: string
      description: string | null
      tags: string[]
      /** Format: uuid */
      userId: string
      updatedAt: unknown
      createdAt: unknown
      deletedAt: unknown
    }
    InflowSearchDto: {
      /** @description List of expenses found */
      data: components['schemas']['InflowDto'][]
      /** @description Meta information about search results */
      meta: components['schemas']['MetaSearchInfo']
    }
    UpdateInflowDto: {
      /**
       * @description Amount received
       * @example 2500
       */
      amount?: number
      /**
       * @description Description of the inflow
       * @example Monthly salary
       */
      description?: string
      /**
       * @description Tags for categorizing the inflow
       * @example [
       *       "salary",
       *       "work"
       *     ]
       */
      tags?: string[]
    }
  }
  responses: never
  parameters: never
  requestBodies: never
  headers: never
  pathItems: never
}
export type $defs = Record<string, never>
export interface operations {
  AuthController_signIn: {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    /** @description User sign-in credentials */
    requestBody: {
      content: {
        'application/json': components['schemas']['SignInDto']
      }
    }
    responses: {
      /** @description User successfully logged in */
      200: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['SignInResponseDto']
        }
      }
    }
  }
  AuthController_signUp: {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    /** @description User sign-up details */
    requestBody: {
      content: {
        'application/json': components['schemas']['SignUpDto']
      }
    }
    responses: {
      /** @description User successfully registered */
      201: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['SignUpResponseDto']
        }
      }
    }
  }
  AuthController_getMe: {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    requestBody?: never
    responses: {
      /** @description Current user details */
      200: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['UserDto']
        }
      }
    }
  }
  UsersController_deleteUser: {
    parameters: {
      query?: never
      header?: never
      path: {
        id: string
      }
      cookie?: never
    }
    requestBody?: never
    responses: {
      /** @description User successfully deleted */
      204: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
      /** @description User is not authorized to delete this account */
      401: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
      /** @description User not found */
      404: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
    }
  }
  UsersController_updateUser: {
    parameters: {
      query?: never
      header?: never
      path: {
        id: string
      }
      cookie?: never
    }
    /** @description User update dto */
    requestBody: {
      content: {
        'application/json': components['schemas']['UserUpdateDto']
      }
    }
    responses: {
      /** @description Updated user */
      200: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['UserDto']
        }
      }
      /** @description User is not authorized to update this profile */
      401: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
      /** @description User not found */
      404: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
    }
  }
  UsersController_getCurrentBalance: {
    parameters: {
      query?: never
      header?: never
      path: {
        id: string
      }
      cookie?: never
    }
    requestBody?: never
    responses: {
      /** @description User's current balance */
      200: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['BalanceDto']
        }
      }
      /** @description User is not authorized to view this balance */
      401: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
      /** @description User not found */
      404: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
    }
  }
  UsersController_getMonthlyBalance: {
    parameters: {
      query?: never
      header?: never
      path: {
        id: string
        /** @description Year for which to get statistics */
        year: number
      }
      cookie?: never
    }
    requestBody?: never
    responses: {
      /** @description Monthly balance breakdown */
      200: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['MonthlyBalanceDto'][]
        }
      }
      /** @description User is not authorized to view these statistics */
      401: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
      /** @description User not found */
      404: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
    }
  }
  UsersController_getFinancialSummary: {
    parameters: {
      query?: never
      header?: never
      path: {
        id: string
      }
      cookie?: never
    }
    requestBody?: never
    responses: {
      /** @description Financial summary */
      200: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['FinancialSummaryDto']
        }
      }
      /** @description User is not authorized to view this financial summary */
      401: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
      /** @description User not found */
      404: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
    }
  }
  UsersController_getTopTags: {
    parameters: {
      query?: never
      header?: never
      path: {
        id: string
      }
      cookie?: never
    }
    requestBody?: never
    responses: {
      /** @description Tag summary */
      200: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['TagSummaryDto']
        }
      }
      /** @description User is not authorized to view these tag statistics */
      401: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
      /** @description User not found */
      404: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
    }
  }
  ExpensesController_findAll: {
    parameters: {
      query?: {
        page?: number
        limit?: number
        search?: string
        tags?: string[]
      }
      header?: never
      path?: never
      cookie?: never
    }
    requestBody?: never
    responses: {
      /** @description List of expenses with pagination metadata */
      200: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['ExpenseSearchDto']
        }
      }
      /** @description User is not authorized to view expenses */
      401: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
    }
  }
  ExpensesController_create: {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['CreateExpenseDto']
      }
    }
    responses: {
      /** @description The expense has been successfully created */
      201: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['ExpenseDto']
        }
      }
      /** @description User is not authorized to create expenses */
      401: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
    }
  }
  ExpensesController_findOne: {
    parameters: {
      query?: never
      header?: never
      path: {
        id: string
      }
      cookie?: never
    }
    requestBody?: never
    responses: {
      /** @description The expense details */
      200: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['ExpenseDto']
        }
      }
      /** @description User is not authorized to view this expense */
      401: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
      /** @description Expense not found */
      404: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
    }
  }
  ExpensesController_update: {
    parameters: {
      query?: never
      header?: never
      path: {
        id: string
      }
      cookie?: never
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['UpdateExpenseDto']
      }
    }
    responses: {
      /** @description The expense has been successfully updated */
      200: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['ExpenseDto']
        }
      }
      /** @description User is not authorized to update this expense */
      401: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
      /** @description Expense not found */
      404: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
    }
  }
  ExpensesController_remove: {
    parameters: {
      query?: never
      header?: never
      path: {
        id: string
      }
      cookie?: never
    }
    requestBody?: never
    responses: {
      /** @description The expense has been successfully deleted */
      200: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['ExpenseDto']
        }
      }
      /** @description User is not authorized to delete this expense */
      401: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
      /** @description Expense not found */
      404: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
    }
  }
  ExpensesController_getTotalSpent: {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    requestBody?: never
    responses: {
      /** @description Total amount spent */
      200: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': number
        }
      }
      /** @description User is not authorized to view total spent */
      401: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
    }
  }
  ExpensesController_getTagStats: {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    requestBody?: never
    responses: {
      /** @description Tag statistics */
      200: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['TagStatistics'][]
        }
      }
      /** @description User is not authorized to view tag statistics */
      401: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
    }
  }
  ExpensesController_getMonthlyStats: {
    parameters: {
      query?: never
      header?: never
      path: {
        year: number
      }
      cookie?: never
    }
    requestBody?: never
    responses: {
      /** @description Monthly statistics */
      200: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['MonthlyStats'][]
        }
      }
      /** @description User is not authorized to view monthly statistics */
      401: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
    }
  }
  InflowsController_findAll: {
    parameters: {
      query?: {
        page?: number
        limit?: number
        search?: string
        tags?: string[]
      }
      header?: never
      path?: never
      cookie?: never
    }
    requestBody?: never
    responses: {
      /** @description List of inflows with pagination metadata */
      200: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['InflowSearchDto']
        }
      }
      /** @description User is not authorized to view inflows */
      401: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
    }
  }
  InflowsController_create: {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['CreateInflowDto']
      }
    }
    responses: {
      /** @description The inflow has been successfully created */
      201: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['InflowDto']
        }
      }
      /** @description User is not authorized to create inflows */
      401: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
    }
  }
  InflowsController_findOne: {
    parameters: {
      query?: never
      header?: never
      path: {
        id: string
      }
      cookie?: never
    }
    requestBody?: never
    responses: {
      /** @description The inflow details */
      200: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['InflowDto']
        }
      }
      /** @description User is not authorized to view this inflow */
      401: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
      /** @description Inflow not found */
      404: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
    }
  }
  InflowsController_remove: {
    parameters: {
      query?: never
      header?: never
      path: {
        id: string
      }
      cookie?: never
    }
    requestBody?: never
    responses: {
      /** @description The inflow has been successfully deleted */
      200: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['InflowDto']
        }
      }
      /** @description User is not authorized to delete this inflow */
      401: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
      /** @description Inflow not found */
      404: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
    }
  }
  InflowsController_update: {
    parameters: {
      query?: never
      header?: never
      path: {
        id: string
      }
      cookie?: never
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['UpdateInflowDto']
      }
    }
    responses: {
      /** @description The inflow has been successfully updated */
      200: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['InflowDto']
        }
      }
      /** @description User is not authorized to update this inflow */
      401: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
      /** @description Inflow not found */
      404: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
    }
  }
  InflowsController_getTotalInflow: {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    requestBody?: never
    responses: {
      /** @description Total amount received */
      200: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': number
        }
      }
      /** @description User is not authorized to view total inflow */
      401: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
    }
  }
  InflowsController_getTagStats: {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    requestBody?: never
    responses: {
      /** @description Tag statistics */
      200: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['TagStatistics']
        }
      }
      /** @description User is not authorized to view tag statistics */
      401: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
    }
  }
  InflowsController_getMonthlyStats: {
    parameters: {
      query?: never
      header?: never
      path: {
        year: number
      }
      cookie?: never
    }
    requestBody?: never
    responses: {
      /** @description Monthly statistics */
      200: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['MonthlyStats']
        }
      }
      /** @description User is not authorized to view monthly statistics */
      401: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
    }
  }
}
