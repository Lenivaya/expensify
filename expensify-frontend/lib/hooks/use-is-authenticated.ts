'use client'

import { useIsAuthTokenPresent } from './use-auth-token'

export const useIsAuthenticated = () => {
  const isAuthenticated = useIsAuthTokenPresent()
  return isAuthenticated
}
