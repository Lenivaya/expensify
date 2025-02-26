import { expensifyApi } from '@/components/providers/query/query-provider'
import { useIsAuthTokenPresent } from './use-auth-token'

/**
 * Hook to fetch and manage the current user's data
 *
 * @module useUser
 * @description
 * A React hook that provides access to the currently authenticated user's data.
 * It automatically fetches user data when authenticated and provides loading
 * and error states.
 *
 * Features:
 * - Automatic data fetching
 * - Loading state handling
 * - Error state handling
 * - Authentication-aware querying
 * - Type-safe user data
 *
 * @returns {Object} An object containing:
 * - data: The user data if available
 * - isLoading: Boolean indicating if the data is being fetched
 * - error: Any error that occurred during fetching
 *
 * @example
 * ```tsx
 * function UserProfile() {
 *   const { data: user, isLoading, error } = useUser()
 *
 *   if (isLoading) {
 *     return <div>Loading user data...</div>
 *   }
 *
 *   if (error) {
 *     return <div>Error loading user data</div>
 *   }
 *
 *   return (
 *     <div>
 *       <h1>Welcome, {user.name}!</h1>
 *       <p>Email: {user.email}</p>
 *     </div>
 *   )
 * }
 * ```
 */
export const useUser = () => {
  const isAuthTokenPresent = useIsAuthTokenPresent()

  const { data, isLoading, error } =
    expensifyApi.auth.authControllerGetMe.useQuery(
      {
        queryKey: ['currentUser', isAuthTokenPresent]
      },
      {
        enabled: isAuthTokenPresent
      }
    )

  return { data, isLoading, error }
}
