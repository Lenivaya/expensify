'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { requestFn } from '@openapi-qraft/react'

import { env } from '@/env'
import { createAPIClient } from '@/lib/api'
import type { ReactNode } from 'react'
import { isSome } from '@/lib/utils'

/**
 * Global QueryClient instance for managing React Query state
 * @description
 * This instance is used across the application to handle caching,
 * refetching, and state management for API requests.
 */
const queryClient = new QueryClient()

/**
 * Configured API client for the Expensify backend
 *
 * @description
 * This client is configured with:
 * - Automatic token injection from localStorage
 * - Base URL from environment variables
 * - Integration with React Query for caching and state management
 * - Type-safe API operations generated from OpenAPI schema
 *
 * Features:
 * - Automatic authentication header injection
 * - Request/response type safety
 * - Integrated caching with React Query
 * - Environment-aware configuration
 *
 * @example
 * ```tsx
 * // Using the API client in a component
 * const { data, isLoading } = expensifyApi.expenses.getExpenses.useQuery({})
 *
 * // Making a mutation
 * const mutation = expensifyApi.expenses.createExpense.useMutation()
 * await mutation.mutateAsync({ amount: 100 })
 * ```
 */
export const expensifyApi = createAPIClient({
  queryClient,
  requestFn(schema, requestInfo) {
    const token = localStorage.getItem('auth:token')
    console.log(requestInfo)

    return requestFn(schema, {
      ...requestInfo,
      /** Specify your predefined Headers **/
      headers: isSome(token)
        ? {
            // biome-ignore lint/style/useNamingConvention: <explanation>
            Authorization: `Bearer ${token}`,
            ...requestInfo.headers
          }
        : {
            ...requestInfo.headers
          }
    })
  },
  baseUrl: env.NEXT_PUBLIC_API_URL
})

/**
 * Props for the QueryProvider component
 * @interface QueryProviderProps
 * @property {ReactNode} children - Child components to be wrapped with the query provider
 */
interface QueryProviderProps {
  children: ReactNode
}

/**
 * Application-wide provider for React Query functionality
 *
 * @module QueryProvider
 * @description
 * This component provides React Query context to the entire application,
 * enabling data fetching, caching, and state management features.
 * It uses a shared QueryClient instance for consistent caching across the app.
 *
 * Features:
 * - Global query state management
 * - Shared caching layer
 * - Automatic background refetching
 * - Request deduplication
 * - Optimistic updates
 * - Client-side only execution ('use client')
 *
 * @example
 * ```tsx
 * // Usage in app root
 * export default function App() {
 *   return (
 *     <QueryProvider>
 *       <RestOfApp />
 *     </QueryProvider>
 *   )
 * }
 * ```
 */
export const QueryProvider = ({ children }: QueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
