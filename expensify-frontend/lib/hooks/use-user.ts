import { expensifyApi } from '@/components/providers/query/query-provider'
import { useIsAuthTokenPresent } from './use-auth-token'

export const useUser = () => {
  const isAuthTokenPresent = useIsAuthTokenPresent()

  const { data, isLoading, error } =
    expensifyApi.auth.authControllerGetMe.useQuery(
      {
        queryKey: ['currentUser', isAuthTokenPresent]
      },
      {
        enabled: isAuthTokenPresent
      }
    )

  return { data, isLoading, error }
}
