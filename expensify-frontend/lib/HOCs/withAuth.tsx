/**
 * Higher-order component for protecting routes that require authentication
 *
 * @module withAuth
 * @description
 * A higher-order component (HOC) that provides authentication protection for routes
 * and components. It automatically redirects unauthenticated users to the sign-in
 * page and renders the protected component only for authenticated users.
 *
 * Features:
 * - Automatic authentication checking
 * - Client-side route protection
 * - Seamless sign-in redirection
 * - TypeScript support with generics
 * - Preserves component props
 * - Zero configuration required
 *
 * Usage Patterns:
 * 1. Page Protection:
 *    Wrap Next.js page components to protect entire routes
 * 2. Component Protection:
 *    Wrap individual components to show only to authenticated users
 * 3. Feature Protection:
 *    Protect specific features or sections within a page
 *
 * @template T - The props type of the wrapped component
 *
 * @example
 * ```tsx
 * // Protect a page component
 * function DashboardPage(props: DashboardProps) {
 *   return <div>Protected Dashboard Content</div>
 * }
 * export default withAuth(DashboardPage)
 *
 * // Protect a component
 * const ProtectedFeature = withAuth(({ data }: FeatureProps) => (
 *   <div>Protected Feature: {data}</div>
 * ))
 *
 * // Use in a parent component
 * function App() {
 *   return (
 *     <div>
 *       <h1>Public Content</h1>
 *       <ProtectedFeature data="sensitive" />
 *     </div>
 *   )
 * }
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
 *
 * @description
 * This function implements the authentication protection logic. It:
 * 1. Checks the authentication state
 * 2. Redirects to sign-in if not authenticated
 * 3. Renders the protected component if authenticated
 *
 * The wrapped component receives all its original props unchanged.
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
