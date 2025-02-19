'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { requestFn } from '@openapi-qraft/react'

import { env } from '@/env'
import { createAPIClient } from '@/lib/api'
import type { ReactNode } from 'react'
import { isSome } from '@/lib/utils'

const queryClient = new QueryClient()

export const expensifyApi = createAPIClient({
  queryClient,
  requestFn(schema, requestInfo) {
    const token = localStorage.getItem('auth:token')
    console.log(requestInfo)

    return requestFn(schema, {
      ...requestInfo,
      /** Specify your predefined Headers **/
      headers: isSome(token)
        ? {
            // biome-ignore lint/style/useNamingConvention: <explanation>
            Authorization: `Bearer ${token}`,
            ...requestInfo.headers
          }
        : {
            ...requestInfo.headers
          }
    })
  },
  baseUrl: env.NEXT_PUBLIC_API_URL
})

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
