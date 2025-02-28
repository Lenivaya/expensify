'use client'

import { useUser } from '@/lib/hooks/use-user'
import { useMemo } from 'react'
import { match, P } from 'ts-pattern'

/**
 * Props for the ShowOnlyForUser component
 * @interface Props
 * @property {React.ReactNode} children - The content to conditionally render
 * @property {string} [userIdToCheckAuth] - Optional user ID to check against for authorization
 */
interface Props {
  children: React.ReactNode
  userIdToCheckAuth?: string
}

/**
 * A component that conditionally renders content based on user authentication and authorization
 *
 * @description
 * This component provides a declarative way to control content visibility based on user authentication
 * and specific user authorization. It uses pattern matching for clear and type-safe authorization logic.
 *
 * Features:
 * - Conditional rendering based on authentication state
 * - User-specific authorization checks
 * - Type-safe pattern matching using ts-pattern
 * - Memoized result for performance optimization
 * - Client-side only execution ('use client')
 *
 * @example
 * ```tsx
 * // Show content only for authenticated user
 * <ShowOnlyForUser>
 *   <RestrictedContent />
 * </ShowOnlyForUser>
 *
 * // Show content only for specific user
 * <ShowOnlyForUser userIdToCheckAuth="user-123">
 *   <UserSpecificContent />
 * </ShowOnlyForUser>
 * ```
 */
export function ShowOnlyForUser({ children, userIdToCheckAuth }: Props) {
  const { data: user } = useUser()

  const result = useMemo(() => {
    return match({ user, userIdToCheckAuth })
      .with({ user: P.nullish }, () => null)
      .with({ user: { id: userIdToCheckAuth } }, () => <>{children}</>)
      .otherwise(() => null)
  }, [children, user, userIdToCheckAuth])

  return result
}
