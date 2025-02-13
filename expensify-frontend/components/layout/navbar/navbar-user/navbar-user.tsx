'use client'

import { expensifyApi } from '@/components/providers/query/query-provider'
import { useIsAuthTokenPresent } from '@/lib/hooks/use-auth-token'
import { isNone, isSome } from '@/lib/utils'
import { NavbarUserAuthenticated } from './navbar-user-authenticated'
import { NavbarUserUnauthenticated } from './navbar-user-unauthenticated'

export function NavbarUser() {
  const isAuthTokenPresent = useIsAuthTokenPresent()

  const { data, isLoading, error } =
    expensifyApi.auth.authControllerGetMe.useQuery(
      {
        queryKey: ['currentUser']
      },
      {
        enabled: isAuthTokenPresent
      }
    )
  if (error) {
    console.error(error)
  }

  const isQueryValid =
    isSome(data) && isNone(error) && !isLoading

  return isQueryValid ? (
    <NavbarUserAuthenticated user={data} />
  ) : (
    <NavbarUserUnauthenticated />
  )
}
