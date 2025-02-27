'use client'

import { isSome, type Option } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts'

/**
 * Hook to check if an authentication token is present in local storage
 *
 * @description
 * A React hook that monitors the presence of an authentication token in local storage.
 * It provides real-time updates when the token status changes.
 *
 * Features:
 * - Reactive token presence detection
 * - Automatic updates on token changes
 * - Safe local storage access
 * - Client-side only execution
 *
 * @returns {boolean} True if a valid auth token is present, false otherwise
 *
 * @example
 * ```tsx
 * function AuthStatus() {
 *   const isTokenPresent = useIsAuthTokenPresent()
 *
 *   return (
 *     <div>
 *       User is {isTokenPresent ? 'authenticated' : 'not authenticated'}
 *     </div>
 *   )
 * }
 * ```
 */
export const useIsAuthTokenPresent = () => {
  const token = useReadLocalStorage('auth:token', {
    deserializer: (value) => value ?? null
  })

  const [isPresent, setIsPresent] = useState(isSome(token))

  useEffect(() => {
    setIsPresent(isSome(token))
  }, [token])

  return isPresent
}

/**
 * Hook for managing authentication token in local storage
 *
 * @description
 * A React hook that provides functionality to read, write, and remove
 * the authentication token from local storage. It uses a tuple return
 * pattern for easy destructuring.
 *
 * Features:
 * - Persistent token storage
 * - Type-safe token management
 * - Automatic serialization/deserialization
 * - Null safety with Option type
 *
 * @returns {[Option<string>, (token: string) => void, () => void]}
 * A tuple containing:
 * - Current token value (null if not present)
 * - Function to set a new token
 * - Function to remove the token
 *
 * @example
 * ```tsx
 * function LoginComponent() {
 *   const [token, setToken, removeToken] = useAuthToken()
 *
 *   const handleLogin = async (credentials) => {
 *     const token = await loginUser(credentials)
 *     setToken(token)
 *   }
 *
 *   const handleLogout = () => {
 *     removeToken()
 *   }
 *
 *   return token ? (
 *     <button onClick={handleLogout}>Logout</button>
 *   ) : (
 *     <button onClick={handleLogin}>Login</button>
 *   )
 * }
 * ```
 */
export const useAuthToken = (): [
  Option<string>,
  (token: string) => void,
  () => void
] => {
  const [value, setAuthToken, removeValue] = useLocalStorage<Option<string>>(
    'auth:token',
    null,
    {
      serializer: (value) => value ?? '',
      deserializer: (value) => value ?? null
    }
  )

  return [value, setAuthToken, removeValue]
}
