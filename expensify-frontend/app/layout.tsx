import type React from 'react'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { Navbar } from '@/components/layout/navbar/navbar'
import { Footer } from '@/components/layout/footer'
import { QueryProvider } from '@/components/providers/query/query-provider'
import { CookiePopupProvider } from '@/components/providers/cookie/cookie-popup'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Expensify',
  description: 'Track your expenses and manage your budget'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning={true} className='dark'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased flex flex-col`}
      >
        <QueryProvider>
          <CookiePopupProvider>
            <Navbar />
            <main className='flex-1'>{children}</main>
            <Footer />
          </CookiePopupProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  )
}
