export interface StrengthConfig {
  label: string
  percentage: number
}

export type StrengthMapType = {
  [Key in PasswordStrength]: StrengthConfig
}

export interface StyleConfig {
  containerClassName?: string
  progressBarClassName?: string
  labelClassName?: string
  inputClassName?: string
  toggleButtonClassName?: string
  toggleIconClassName?: string
  showPercentage?: boolean
  strengthLabelClassName?: string
  submitButtonClassName?: string
}
export type PasswordStrength =
  | 'veryWeak'
  | 'weak'
  | 'moderate'
  | 'strong'
  | 'veryStrong'
