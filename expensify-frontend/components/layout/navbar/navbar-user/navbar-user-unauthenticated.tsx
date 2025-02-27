import { Button } from '@/components/ui/button'
import { LogIn, UserPlus } from 'lucide-react'
import Link from 'next/link'

/**
 * Component for rendering unauthenticated user controls in the navbar
 *
 * @description
 * This component displays sign-in and sign-up options for unauthenticated users
 * in the navigation bar. It features animated buttons with hover effects and
 * clear visual hierarchy.
 *
 * Features:
 * - Animated button interactions
 * - Gradient background on hover
 * - Icon animations
 * - Text rotation effects
 * - Responsive layout
 * - Client-side navigation with Next.js Link
 * - Hydration warning suppression
 *
 * Visual Elements:
 * - Sign in button with login icon
 * - Sign up button with user plus icon
 * - Separator text ("or")
 * - Hover animations for both buttons
 * - Gradient background container
 *
 * @example
 * ```tsx
 * // Usage in NavbarUser component
 * export function NavbarUser() {
 *   const { isAuthenticated } = useAuth()
 *   return isAuthenticated ? (
 *     <NavbarUserAuthenticated />
 *   ) : (
 *     <NavbarUserUnauthenticated />
 *   )
 * }
 * ```
 */
export function NavbarUserUnauthenticated() {
  return (
    <div
      suppressHydrationWarning={true}
      className='flex items-center gap-2 rounded-full bg-linear-to-r from-background to-background px-4 py-2 transition-all duration-300 hover:from-primary/5 hover:to-secondary/5'
    >
      <Link
        suppressHydrationWarning={true}
        href='/auth/sign-in'
        passHref={true}
      >
        <Button
          variant='ghost'
          className='group flex items-center gap-1 p-0 hover:bg-transparent'
        >
          <LogIn className='mr-1 h-4 w-4 transition-transform group-hover:scale-110' />
          <span className='transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110'>
            Sign in
          </span>
        </Button>
      </Link>
      <span className='text-muted-foreground text-xs'>or</span>
      <Link href='/auth/sign-up' passHref={true}>
        <Button
          variant='ghost'
          className='group flex items-center gap-1 p-0 hover:bg-transparent'
        >
          <UserPlus className='mr-1 h-4 w-4 transition-transform group-hover:scale-110' />
          <span className='transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110'>
            Sign up
          </span>
        </Button>
      </Link>
    </div>
  )
}
