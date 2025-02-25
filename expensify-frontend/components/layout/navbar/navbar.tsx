'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavbarUser } from './navbar-user/navbar-user'
import {
  BarChart3,
  PieChart,
  WalletCards,
  Settings,
  DollarSign
} from 'lucide-react'

export function Navbar() {
  const pathname = usePathname()

  return (
    <div className='fixed top-5 z-40 flex w-full justify-center px-4 pt-4'>
      <header className='relative w-full rounded-full border border-border/40 bg-background/95 shadow-primary/5 shadow-xs backdrop-blur-md transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 supports-backdrop-filter:bg-background/60 md:w-[90%] lg:w-[80%] xl:w-[60%]'>
        <div className='absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 opacity-0 transition-opacity duration-500 ease-in-out hover:opacity-100' />

        <div className='relative flex h-16 items-center justify-between px-8'>
          <div className='flex items-center gap-8'>
            <Link
              href='/'
              className='group flex items-center gap-2.5 transition-all duration-300 hover:scale-105'
            >
              <DollarSign className='h-6 w-6 text-primary' />
              <span className='font-black text-xl tracking-tight'>
                Expensify
              </span>
            </Link>

            <div className='h-7 w-[1px] bg-gradient-to-b from-border/5 via-border/40 to-border/5' />

            <nav className='flex items-center space-x-6'>
              <Link
                href='/dashboard'
                className={cn(
                  'group flex items-center gap-2 font-medium text-sm transition-all duration-300',
                  pathname.startsWith('/dashboard')
                    ? 'scale-105 text-primary'
                    : 'text-muted-foreground hover:scale-105 hover:text-primary'
                )}
              >
                <BarChart3 className='h-4 w-4' />
                <span>Dashboard</span>
              </Link>
              <Link
                href='/expenses'
                className={cn(
                  'group flex items-center gap-2 font-medium text-sm transition-all duration-300',
                  pathname.startsWith('/expenses')
                    ? 'scale-105 text-primary'
                    : 'text-muted-foreground hover:scale-105 hover:text-primary'
                )}
              >
                <WalletCards className='h-4 w-4' />
                <span>Expenses</span>
              </Link>
              <Link
                href='/reports'
                className={cn(
                  'group flex items-center gap-2 font-medium text-sm transition-all duration-300',
                  pathname.startsWith('/reports')
                    ? 'scale-105 text-primary'
                    : 'text-muted-foreground hover:scale-105 hover:text-primary'
                )}
              >
                <PieChart className='h-4 w-4' />
                <span>Reports</span>
              </Link>
              <Link
                href='/settings'
                className={cn(
                  'group flex items-center gap-2 font-medium text-sm transition-all duration-300',
                  pathname.startsWith('/settings')
                    ? 'scale-105 text-primary'
                    : 'text-muted-foreground hover:scale-105 hover:text-primary'
                )}
              >
                <Settings className='h-4 w-4' />
                <span>Settings</span>
              </Link>
            </nav>
          </div>

          <NavbarUser />
        </div>
      </header>
    </div>
  )
}
