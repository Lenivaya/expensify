'use client'

import { isSome, type Option } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts'

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
