/**
 * Higher-order component for protecting routes that require authentication.
 * Redirects unauthenticated users to the sign-in page.
 *
 * @module withAuth
 * @example
 * ```tsx
 * // Protect a page component
 * export default withAuth(DashboardPage)
 *
 * // Protect a component
 * const ProtectedComponent = withAuth(MyComponent)
 * ```
 */

import { useRouter } from 'next/navigation'
import { useIsAuthenticated } from '../hooks/use-is-authenticated'

/**
 * Wraps a component with authentication protection
 *
 * @template T - The props type of the wrapped component
 * @param {React.ComponentType<T>} Component - The component to wrap with auth protection
 * @returns {React.FC<T>} The wrapped component with auth protection
 */
export function withAuth<T extends object>(
  Component: React.ComponentType<T>
): React.FC<T> {
  return function WithAuth(props: T) {
    const router = useRouter()
    const isAuthenticated = useIsAuthenticated()

    // Redirect to login page if not authenticated
    if (!isAuthenticated) {
      router.push('/auth/sign-in')
      return null
    }

    return <Component {...props} />
  }
}
