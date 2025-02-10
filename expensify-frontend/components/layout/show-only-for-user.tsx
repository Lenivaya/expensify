'use client'

// import { useAuthUser } from '@/hooks/use-authentication'
// import { useMemo } from 'react'
// import { match, P } from 'ts-pattern'
//
// interface Props {
//   children: React.ReactNode
//   userIdToCheckAuth?: string
// }
//
// export function ShowOnlyForUser({ children, userIdToCheckAuth }: Props) {
//   const { user } = useAuthUser()
//
//   const result = useMemo(() => {
//     return match({ user, userIdToCheckAuth })
//       .with({ user: P.nullish }, () => null)
//       .with({ user: { id: userIdToCheckAuth } }, () => <>{children}</>)
//       .otherwise(() => null)
//   }, [children, user, userIdToCheckAuth])
//
//   return result
// }
