'use client'

import { expensifyApi } from '@/components/providers/query/query-provider'
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
import { Separator } from '@/components/ui/separator'
import { Card } from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Eye, EyeOff, Loader2, UserPlus } from 'lucide-react'
import Link from 'next/link'
import PasswordStrengthChecker from '@/components/generic/password-strength-checker/PasswordStrenghChecker'

/**
 * Schema for validating registration form data
 * @remarks
 * - Username must be at least 3 characters and can only contain letters, numbers, underscores, and hyphens
 * - Email must be a valid email address
 * - Password must be at least 8 characters
 * - First and last names are optional
 */
const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Username can only contain letters, numbers, underscores, and hyphens'
    ),
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .min(1, 'Password is required'),
  firstName: z.string().default(''),
  lastName: z.string().default('')
})

/**
 * Type representing the validated form values from the registration schema
 * @see registerSchema for validation rules
 */
type RegisterFormValues = z.infer<typeof registerSchema>

/**
 * A form component for user registration
 *
 * @description
 * This component provides a registration form interface for new users to create an account.
 * It includes fields for username, email, password, and optional personal information.
 *
 * Features:
 * - Username validation with allowed character rules
 * - Email validation
 * - Password strength checking
 * - Optional first and last name fields
 * - Form validation with error messages
 * - Loading states during registration
 * - Navigation to login
 * - Terms of service and privacy policy links
 * - Accessible form controls with ARIA labels
 * - Responsive design with mobile-friendly inputs
 * - Two-section layout: Account and Personal Information
 *
 * @example
 * ```tsx
 * <RegisterForm />
 * ```
 */
export function RegisterForm() {
  const router = useRouter()

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    }
  })

  const register = expensifyApi.auth.authControllerSignUp.useMutation({}, {})
  const registerCount = expensifyApi.auth.authControllerSignUp.useIsMutating()
  const fetching = registerCount > 0

  const onSubmit = useCallback(
    async (values: RegisterFormValues) => {
      await register.mutateAsync(values)

      if (register.isError) {
        console.error(register.error)
        toast('Error logging in, check console')
        form.setError('root', {
          message:
            'An unexpected error occurred, please try again later or check console'
        })
      }

      router.push('/')
      toast('Logged in successfully created')
    },
    [form, register, router]
  )

  const [showPassword, setShowPassword] = useState(false)

  return (
    <Form {...form}>
      <Card className='relative mx-auto w-full max-w-md border border-border/40 bg-background p-8 shadow-primary/5 shadow-xs transition-all duration-300 hover:shadow-lg hover:shadow-primary/10'>
        <div className='pointer-events-none absolute inset-x-0 inset-y-0 rounded-lg bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100' />
        <div className='mb-8 space-y-2 text-center'>
          <div className='mb-4 flex justify-center'>
            <UserPlus className='h-12 w-12 text-primary' />
          </div>
          <h1 className='font-semibold text-2xl tracking-tight'>
            Create an account
          </h1>
          <p className='text-muted-foreground text-sm'>
            Track your expenses with Expensify today
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          {/* Account Information Section */}
          <div className='space-y-6'>
            <div>
              <h2 className='mb-4 font-medium text-base'>
                Account Information
              </h2>
              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter your username'
                          {...field}
                          disabled={fetching}
                          className='shadow-xs'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type='email'
                          placeholder='Enter your email'
                          {...field}
                          disabled={fetching}
                          className='shadow-xs'
                        />
                      </FormControl>
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
                        <PasswordStrengthChecker
                          initialPassword={field.value}
                          placeholder='Enter your password'
                          onPasswordChange={(password, strength) => {
                            field.onChange(password)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator className='my-6' />

            {/* Personal Information Section */}
            <div>
              <h2 className='mb-4 font-medium text-base'>
                Personal Information
              </h2>
              <div className='grid gap-4 sm:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name (optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter your first name'
                          {...field}
                          value={field.value ?? ''}
                          disabled={fetching}
                          className='shadow-xs'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name (optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter your last name'
                          {...field}
                          value={field.value ?? ''}
                          disabled={fetching}
                          className='shadow-xs'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <Separator className='my-6' />

          {form.formState.errors.root && (
            <div className='mb-6 rounded-md bg-destructive/10 p-3 text-destructive text-sm'>
              {form.formState.errors.root.message}
            </div>
          )}

          <div className='space-y-6'>
            <Button type='submit' className='w-full' disabled={fetching}>
              {fetching ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Creating account
                </>
              ) : (
                'Create account'
              )}
            </Button>

            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <Separator className='w-full' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  Already have an account?
                </span>
              </div>
            </div>

            <Button
              type='button'
              variant='outline'
              className='w-full'
              asChild={true}
            >
              <Link href='/auth/sign-in'>Sign in</Link>
            </Button>
          </div>
        </form>

        <div className='mt-8 text-center text-muted-foreground text-xs'>
          By creating an account, you agree to our{' '}
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
