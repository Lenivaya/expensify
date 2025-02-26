'use client'

import { useIsAuthTokenPresent } from './use-auth-token'

/**
 * Hook to check if the user is currently authenticated
 *
 * @module useIsAuthenticated
 * @description
 * A React hook that provides a simple way to check if the user is currently
 * authenticated. It uses the presence of an auth token as the authentication
 * indicator.
 *
 * Features:
 * - Simple boolean return value
 * - Reactive authentication state
 * - Automatic updates on auth changes
 * - Client-side only execution
 *
 * @returns {boolean} True if the user is authenticated, false otherwise
 *
 * @example
 * ```tsx
 * function ProtectedComponent() {
 *   const isAuthenticated = useIsAuthenticated()
 *
 *   if (!isAuthenticated) {
 *     return <div>Please log in to view this content</div>
 *   }
 *
 *   return <div>Protected content</div>
 * }
 * ```
 */
export const useIsAuthenticated = () => {
  const isAuthenticated = useIsAuthTokenPresent()
  return isAuthenticated
}
