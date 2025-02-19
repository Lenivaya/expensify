import type React from 'react'
import { useState, useCallback, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator'
import { PasswordStrengthVerifier } from './PasswordStrengthVerifier'
import type { PasswordStrength, StrengthMapType, StyleConfig } from './types'
import { cn } from '@/lib/utils'

interface PasswordStrengthCheckerProps {
  /**
   * Callback function that is called when the password changes.
   */
  onPasswordChange?: (password: string, strength: PasswordStrength) => void
  /**
   * Callback function that is called when the password is submitted.
   */
  onSubmit?: (password: string, strength: PasswordStrength) => void
  /**
   * The initial password to display.
   */
  initialPassword?: string
  /**
   * The placeholder text for the password input.
   */
  placeholder?: string
  /**
   * Custom strength configuration map
   */
  strengthMap?: Partial<StrengthMapType>
  /**
   * Custom style configuration
   */
  styleConfig?: StyleConfig
  /**
   * Whether to show the strength indicator
   */
  showStrengthIndicator?: boolean
  /**
   * Whether to show the toggle password button
   */
  showToggleButton?: boolean
  /**
   * Custom class for the form wrapper
   */
  className?: string
}

/**
 * PasswordStrengthChecker is a component that allows users to check the strength of their password.
 * It uses the PasswordStrengthVerifier to determine the strength of the password and displays the strength indicator.
 * It also allows the user to toggle the visibility of the password.
 * It also allows the user to submit the password along with its strength to the parent component.
 */
const PasswordStrengthChecker: React.FC<PasswordStrengthCheckerProps> = ({
  onPasswordChange,
  onSubmit,
  initialPassword = '',
  placeholder = 'Enter password',
  styleConfig = {},
  className,
  showStrengthIndicator = true,
  strengthMap
}) => {
  const [password, setPassword] = useState(initialPassword)
  const [strength, setStrength] = useState<PasswordStrength>('veryWeak')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const passwordVerifier = new PasswordStrengthVerifier()
    const newStrength = passwordVerifier.verify(password)
    setStrength(newStrength)
    onPasswordChange?.(password, newStrength)
  }, [password, onPasswordChange])

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPassword = e.target.value
      setPassword(newPassword)
    },
    []
  )

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit?.(password, strength)
    },
    [password, strength, onSubmit]
  )

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('w-full max-w-md space-y-3', 'rounded-lg', className)}
    >
      <div className='relative'>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          value={password}
          onChange={handlePasswordChange}
          className={cn('pr-10', styleConfig?.inputClassName)}
        />
        <Button
          type='button'
          variant='ghost'
          size='icon'
          className={cn(
            'absolute top-0 right-0 h-full px-3',
            'hover:bg-transparent',
            styleConfig?.toggleButtonClassName
          )}
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <EyeOff className='h-4 w-4 text-muted-foreground/70' />
          ) : (
            <Eye className='h-4 w-4 text-muted-foreground/70' />
          )}
        </Button>
      </div>
      {showStrengthIndicator !== false && (
        <PasswordStrengthIndicator
          strength={strength}
          strengthMap={strengthMap}
          styleConfig={styleConfig}
        />
      )}
      {onSubmit && (
        <Button
          type='submit'
          className={cn(
            'w-full',
            'h-10',
            'transition-all duration-200',
            'hover:opacity-90 active:scale-[0.98]',
            'dark:hover:bg-primary/90',
            styleConfig?.submitButtonClassName
          )}
        >
          Submit
        </Button>
      )}
    </form>
  )
}

export default PasswordStrengthChecker
