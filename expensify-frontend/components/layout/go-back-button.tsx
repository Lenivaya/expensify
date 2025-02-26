'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

/**
 * Props for the GoBackButton component
 * @interface GoBackButtonProps
 * @property {string} [text='Go back'] - The text to display next to the back arrow. Defaults to 'Go back'
 * @property {() => void} [onClick] - Optional callback function to execute before navigating back
 */
interface GoBackButtonProps {
  text?: string
  onClick?: () => void
}

/**
 * A reusable button component for navigation back to the previous page
 *
 * @module GoBackButton
 * @description
 * This component provides a consistent way to navigate back in the application history.
 * It combines Next.js router navigation with optional custom click handling.
 *
 * Features:
 * - Animated arrow icon on hover
 * - Customizable text
 * - Optional click handler for additional functionality
 * - Consistent styling with the application's design system
 * - Accessible interactive elements
 *
 * @example
 * ```tsx
 * // Basic usage
 * <GoBackButton />
 *
 * // With custom text and click handler
 * <GoBackButton
 *   text="Return to dashboard"
 *   onClick={() => console.log('Navigating back')}
 * />
 * ```
 */
export function GoBackButton({ text = 'Go back', onClick }: GoBackButtonProps) {
  const router = useRouter()

  const handleClick = useCallback(() => {
    onClick?.()
    router.back()
  }, [onClick, router])

  return (
    <div
      className='group flex cursor-pointer items-center gap-2 text-muted-foreground transition-colors hover:text-primary'
      onClick={handleClick}
    >
      <ArrowLeft className='group-hover:-translate-x-1 h-4 w-4 transition-transform' />
      {text}
    </div>
  )
}
