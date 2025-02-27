'use client'

import type React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import type { components } from '@/lib/api'
import { ChevronDown, LogOut, Settings, User, UserCircle } from 'lucide-react'
import Link from 'next/link'
import { useCallback } from 'react'
import { useAuthToken } from '@/lib/hooks/use-auth-token'

/*
 * User data
 * */
type UserData = Pick<
  components['schemas']['UserDto'],
  'username' | 'email' | 'id'
>

/**
 * Props for the NavbarUserAuthenticated component
 * @interface NavbarUserAuthenticatedProps
 * @property {UserData} user - The authenticated user's data from the API
 * @property {() => void} [handleLogout] - Optional callback function to handle user logout
 */
interface NavbarUserAuthenticatedProps {
  user: UserData
  handleLogout?: () => void
}

/**
 * NavbarUserAuthenticated Component
 *
 * Renders a dropdown menu for authenticated users in the navigation bar.
 * Displays user information and provides navigation options for profile, settings,
 * and logout functionality.
 *
 * @component
 * @example
 * ```tsx
 * <NavbarUserAuthenticated user={{
 *   username: "johndoe",
 *   email: "john@example.com"
 * }} />
 * ```
 */
export function NavbarUserAuthenticated({
  user,
  handleLogout
}: NavbarUserAuthenticatedProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_t, _ct, removeToken] = useAuthToken()

  const handleLogoutWrapper = useCallback(async () => {
    removeToken()
    handleLogout?.()
    localStorage.removeItem('auth:token')
    window.location.reload()
  }, [handleLogout, removeToken])

  return (
    <div suppressHydrationWarning={true}>
      <MenuItem handleLogout={handleLogoutWrapper} user={user}>
        <Button
          variant='ghost'
          size='sm'
          className='flex h-9 items-center gap-2 px-3 py-2 hover:bg-accent'
        >
          <UserCircle className='h-5 w-5 text-muted-foreground' />
          <span className='font-medium text-sm'>{user.username}</span>
          <ChevronDown className='h-4 w-4 text-muted-foreground' />
        </Button>
      </MenuItem>
    </div>
  )
}

/**
 * Props for the MenuItem component
 * @interface MenuItemProps
 * @property {UserData} user - The authenticated user's data
 * @property {React.ReactNode} children - The trigger element for the dropdown menu
 * @property {() => void} [handleLogout] - Optional callback function to handle user logout
 */
interface MenuItemProps {
  user: UserData
  children: React.ReactNode
  handleLogout?: () => void
}

function MenuItem({ user, children, handleLogout }: MenuItemProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild={true}>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-56'>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='font-medium text-sm leading-none'>{user.username}</p>
            <p className='text-muted-foreground text-xs leading-none'>
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href='/dashboard/profile'>
          <DropdownMenuItem className='cursor-pointer focus:bg-accent'>
            <User className='mr-2 h-4 w-4' />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        <Link href='/dashboard/settings'>
          <DropdownMenuItem className='cursor-pointer focus:bg-accent'>
            <Settings className='mr-2 h-4 w-4' />
            <span>Settings</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive'
          onClick={handleLogout}
        >
          <LogOut className='mr-2 h-4 w-4' />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
