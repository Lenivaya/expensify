import { expensifyApi } from '@/components/providers/query/query-provider'

export function useUpdateCookieConsent() {
  const updateCookieConsent =
    expensifyApi.analytics.analyticsControllerUpdateConsent.useMutation()
  const updateCookieConsentCount =
    expensifyApi.analytics.analyticsControllerUpdateConsent.useIsMutating()
  const fetching = updateCookieConsentCount > 0

  return {
    updateCookieConsent,
    fetching
  }
}
