'use client'

import { isNone, isSome } from '@/lib/utils'
import { NavbarUserAuthenticated } from './navbar-user-authenticated'
import { NavbarUserUnauthenticated } from './navbar-user-unauthenticated'
import { useUser } from '@/lib/hooks/use-user'

/**
 * A smart component that handles user authentication state in the navbar
 *
 * @description
 * This component acts as a container that conditionally renders either the authenticated
 * or unauthenticated user interface in the navbar based on the current authentication state.
 * It handles loading states and error conditions gracefully.
 *
 * Features:
 * - Automatic authentication state detection
 * - Conditional rendering based on auth state
 * - Error handling with console logging
 * - Loading state management
 * - Client-side only execution ('use client')
 *
 * States:
 * - Authenticated: Shows user profile and related actions
 * - Unauthenticated: Shows sign-in options
 * - Loading: Handled internally
 * - Error: Logs to console and falls back to unauthenticated view
 *
 * @example
 * ```tsx
 * // Usage in Navbar component
 * export function Navbar() {
 *   return (
 *     <header>
 *       <nav>
 *         <NavbarUser />
 *       </nav>
 *     </header>
 *   )
 * }
 * ```
 */
export function NavbarUser() {
  const { data, isLoading, error } = useUser()

  if (error) {
    console.error(error)
  }

  const isQueryValid = isSome(data) && isNone(error) && !isLoading

  return isQueryValid ? (
    <NavbarUserAuthenticated user={data} />
  ) : (
    <NavbarUserUnauthenticated />
  )
}
