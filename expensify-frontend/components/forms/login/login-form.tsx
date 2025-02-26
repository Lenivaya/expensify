'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { isSome } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { Eye, EyeOff, Loader2, KeyRound } from 'lucide-react'
import Link from 'next/link'
import { expensifyApi } from '@/components/providers/query/query-provider'
import { useAuthToken } from '@/lib/hooks/use-auth-token'

/**
 * Schema for validating login form data
 * @remarks
 * - Login (username/email) must be between 3 and 50 characters
 * - Password must be between 8 and 50 characters
 */
const loginSchema = z.object({
  login: z
    .string()
    .min(3, 'Username or email must be at least 3 characters')
    .max(50, 'Username or email must be less than 50 characters'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(50, 'Password must be less than 50 characters')
})

/**
 * Type representing the validated form values from the login schema
 * @see loginSchema for validation rules
 */
type LoginFormValues = z.infer<typeof loginSchema>

/**
 * A form component for user authentication
 *
 * @description
 * This component provides a login form interface with username/email and password fields.
 * It handles user authentication and includes error handling, loading states, and navigation.
 *
 * Features:
 * - Support for both username and email login
 * - Password visibility toggle
 * - Form validation with error messages
 * - Loading states during authentication
 * - "Forgot password" link
 * - Navigation to registration
 * - Terms of service and privacy policy links
 * - Accessible form controls with ARIA labels
 * - Responsive design with mobile-friendly inputs
 *
 * @example
 * ```tsx
 * <LoginForm />
 * ```
 */
export function LoginForm() {
  const router = useRouter()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_token, setAuthToken, _removeAuthToken] = useAuthToken()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: '',
      password: ''
    }
  })

  const login = expensifyApi.auth.authControllerSignIn.useMutation({}, {})
  const loginCount = expensifyApi.auth.authControllerSignIn.useIsMutating()
  const fetching = loginCount > 0

  const onSubmit = useCallback(
    async (values: LoginFormValues) => {
      const result = await login.mutateAsync({
        ...values
      })

      if (login.isError) {
        console.error(login.error)
        toast('Error logging in, check console')
        form.setError('root', {
          message:
            'An unexpected error occurred, please try again later or check console'
        })
      }

      if (isSome(result.accessToken)) {
        setAuthToken(result.accessToken)
        router.push('/')
        toast('Logged in successfully')
      }
    },
    [login, setAuthToken, router, form]
  )

  const [showPassword, setShowPassword] = useState(false)

  return (
    <Form {...form}>
      <Card className='relative mx-auto w-full max-w-md border border-border/40 bg-background p-8 shadow-primary/5 shadow-xs transition-all duration-300 hover:shadow-lg hover:shadow-primary/10'>
        <div className='pointer-events-none absolute inset-x-0 inset-y-0 rounded-lg bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100' />
        <div className='mb-8 space-y-2 text-center'>
          <div className='mb-4 flex justify-center'>
            <KeyRound className='h-12 w-12 text-primary' />
          </div>
          <h1 className='font-semibold text-2xl tracking-tight'>
            Welcome back
          </h1>
          <p className='text-muted-foreground text-sm'>
            Track your expenses with Expensify today
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          {/* Account Information Section */}
          <div>
            <h2 className='mb-4 font-medium text-base'>Account Information</h2>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='login'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username or Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter your username or email'
                        {...field}
                        disabled={fetching}
                        className='shadow-xs'
                        autoComplete='username'
                      />
                    </FormControl>
                    <FormDescription className='text-xs'>
                      Enter the email or username you used to register
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Enter your password'
                          {...field}
                          disabled={fetching}
                          className='pr-10'
                          autoComplete='current-password'
                        />
                        <Button
                          type='button'
                          variant='ghost'
                          size='icon'
                          className='absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent'
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className='h-4 w-4 text-muted-foreground' />
                          ) : (
                            <Eye className='h-4 w-4 text-muted-foreground' />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <div className='flex justify-end'>
                      <Link
                        href='/auth/forgot-password'
                        className='text-primary text-sm hover:underline'
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator className='my-6' />

          {form.formState.errors.root && (
            <div className='rounded-md bg-destructive/10 p-3 text-destructive text-sm'>
              {form.formState.errors.root.message}
            </div>
          )}

          <div className='space-y-6'>
            <Button type='submit' className='w-full' disabled={fetching}>
              {fetching ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Signing in
                </>
              ) : (
                'Sign in'
              )}
            </Button>

            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <Separator className='w-full' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  Don&apos;t have an account?
                </span>
              </div>
            </div>

            <Button
              type='button'
              variant='outline'
              className='w-full'
              asChild={true}
            >
              <Link href='/auth/sign-up'>Create an account</Link>
            </Button>
          </div>
        </form>

        <div className='mt-8 text-center text-muted-foreground text-xs'>
          By signing in, you agree to our{' '}
          <Link
            href='/terms'
            className='underline underline-offset-4 hover:text-primary'
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href='/privacy'
            className='underline underline-offset-4 hover:text-primary'
          >
            Privacy Policy
          </Link>
        </div>
      </Card>
    </Form>
  )
}
