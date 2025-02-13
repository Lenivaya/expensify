import { describe, it, expect, vi } from 'vitest'
import {
  render,
  screen,
  fireEvent
} from '@testing-library/react'
import PasswordStrengthChecker from './PasswordStrenghChecker'
import '@testing-library/jest-dom/vitest'

describe('PasswordStrengthChecker', () => {
  it('renders with default props', () => {
    render(<PasswordStrengthChecker />)
    expect(
      screen.getByPlaceholderText('Enter your password')
    ).toBeInTheDocument()
  })

  it('renders with custom placeholder', () => {
    render(
      <PasswordStrengthChecker placeholder="Custom placeholder" />
    )
    expect(
      screen.getByPlaceholderText('Custom placeholder')
    ).toBeInTheDocument()
  })

  it('renders with initial password', () => {
    render(
      <PasswordStrengthChecker initialPassword="initialPassword123" />
    )
    expect(
      screen.getByDisplayValue('initialPassword123')
    ).toBeInTheDocument()
  })

  it('toggles password visibility', () => {
    render(<PasswordStrengthChecker />)
    const input = screen.getByPlaceholderText(
      'Enter your password'
    )
    const toggleButton = screen.getByRole('button')

    expect(input).toHaveAttribute('type', 'password')
    fireEvent.click(toggleButton)
    expect(input).toHaveAttribute('type', 'text')
    fireEvent.click(toggleButton)
    expect(input).toHaveAttribute('type', 'password')
  })

  it('calls onPasswordChange when password changes', () => {
    const onPasswordChange = vi.fn()
    render(
      <PasswordStrengthChecker
        onPasswordChange={onPasswordChange}
      />
    )
    const input = screen.getByPlaceholderText(
      'Enter your password'
    )

    fireEvent.change(input, {
      target: { value: 'newPassword123' }
    })
    expect(onPasswordChange).toHaveBeenCalledWith(
      'newPassword123',
      expect.any(String)
    )
  })

  it('calls onSubmit when form is submitted', () => {
    const onSubmit = vi.fn()
    render(<PasswordStrengthChecker onSubmit={onSubmit} />)
    const input = screen.getByPlaceholderText(
      'Enter your password'
    )
    const submitButton = screen.getByRole('button', {
      name: 'Submit'
    })

    fireEvent.change(input, {
      target: { value: 'submittedPassword123' }
    })
    fireEvent.click(submitButton)
    expect(onSubmit).toHaveBeenCalledWith(
      'submittedPassword123',
      expect.any(String)
    )
  })

  it('updates strength indicator when password changes', () => {
    render(<PasswordStrengthChecker />)
    const input = screen.getByPlaceholderText(
      'Enter your password'
    )
    expect(
      screen.getByText('Very Weak')
    ).toBeInTheDocument()

    fireEvent.change(input, { target: { value: 'weak' } })
    expect(screen.getByText('Weak')).toBeInTheDocument()

    fireEvent.change(input, {
      target: { value: 'strong_Password^123!' }
    })
    expect(
      screen.getByText('Very Strong')
    ).toBeInTheDocument()
  })
})
