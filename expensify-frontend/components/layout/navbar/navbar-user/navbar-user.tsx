'use client'

import { isNone, isSome } from '@/lib/utils'
import { NavbarUserAuthenticated } from './navbar-user-authenticated'
import { NavbarUserUnauthenticated } from './navbar-user-unauthenticated'
import { useUser } from '@/lib/hooks/use-user'

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
