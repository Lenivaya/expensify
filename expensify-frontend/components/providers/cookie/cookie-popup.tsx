'use client'

import { useUpdateCookieConsent } from '@/lib/hooks/use-update-cookie-consent'
import dynamic from 'next/dynamic'
import { ReactNode, useEffect } from 'react'
import { useCookieConsent } from 'react-cookie-manager'
import 'react-cookie-manager/style.css'
import { toast } from 'sonner'

const CookieManager = dynamic(
  () => import('react-cookie-manager').then((mod) => mod.CookieManager),
  { ssr: false, loading: () => null }
)

interface CookiePopupProviderProps {
  children: ReactNode
}

export function CookiePopupProvider({ children }: CookiePopupProviderProps) {
  const { updateCookieConsent } = useUpdateCookieConsent()

  return (
    <CookieManager
      showManageButton
      displayType='popup'
      theme='dark'
      translations={{
        title: 'Would You Like A Cookie? 🍪',
        message:
          'We value your privacy. Choose which cookies you want to allow. Essential cookies are always enabled as they are necessary for the website to function properly.',
        buttonText: 'Accept All',
        declineButtonText: 'Decline All',
        manageButtonText: 'Manage Cookies',
        privacyPolicyText: 'Privacy Policy'
      }}
      privacyPolicyUrl='/docs/privacy'
      onManage={async (cookiePreferences) => {
        console.log('Cookie preferences:', cookiePreferences)
        if (!cookiePreferences) return
        await updateCookieConsent.mutateAsync({
          body: {
            analytics: cookiePreferences.Analytics,
            social: cookiePreferences.Social,
            advertising: cookiePreferences.Advertising
          }
        })
        toast('Cookie preferences updated')
      }}
    >
      {children}
      <AutoCookiesUpdater />
    </CookieManager>
  )
}

function AutoCookiesUpdater() {
  const { updateCookieConsent } = useUpdateCookieConsent()
  const { detailedConsent } = useCookieConsent()

  useEffect(() => {
    if (detailedConsent) {
      updateCookieConsent.mutateAsync({
        body: {
          analytics: detailedConsent.Analytics.consented,
          social: detailedConsent.Social.consented,
          advertising: detailedConsent.Advertising.consented
        }
      })
    }
  }, [detailedConsent])

  return null
}
