import { expensifyApi } from '@/components/providers/query/query-provider'

export function useTrackActivity() {
  const trackActivity =
    expensifyApi.analytics.analyticsControllerTrackActivity.useMutation()
  const trackActivityCount =
    expensifyApi.analytics.analyticsControllerTrackActivity.useIsMutating()
  const fetching = trackActivityCount > 0

  return {
    trackActivity,
    fetching
  }
}
