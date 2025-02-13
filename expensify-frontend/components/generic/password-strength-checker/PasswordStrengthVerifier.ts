import type { PasswordStrength } from './types'

abstract class PasswordCriterion {
  protected next: PasswordCriterion | null = null

  setNext(criterion: PasswordCriterion): PasswordCriterion {
    this.next = criterion
    return criterion
  }

  abstract check(password: string): number

  verify(password: string): number {
    const score = this.check(password)
    return this.next
      ? score + this.next.verify(password)
      : score
  }
}

class LengthCriterion extends PasswordCriterion {
  check(password: string): number {
    return password.length >= 8 ? 1 : 0
  }
}

class LowercaseCriterion extends PasswordCriterion {
  check(password: string): number {
    return /[a-z]/.test(password) ? 1 : 0
  }
}

class UppercaseCriterion extends PasswordCriterion {
  check(password: string): number {
    return /[A-Z]/.test(password) ? 1 : 0
  }
}

class NumberCriterion extends PasswordCriterion {
  check(password: string): number {
    return /\d/.test(password) ? 1 : 0
  }
}

class SpecialCharCriterion extends PasswordCriterion {
  check(password: string): number {
    return /[^A-Za-z0-9]/.test(password) ? 1 : 0
  }
}

export class PasswordStrengthVerifier {
  verify(password: string): PasswordStrength {
    const lengthCriterion = new LengthCriterion()
    const lowercaseCriterion = new LowercaseCriterion()
    const uppercaseCriterion = new UppercaseCriterion()
    const numberCriterion = new NumberCriterion()
    const specialCharCriterion = new SpecialCharCriterion()

    lengthCriterion
      .setNext(lowercaseCriterion)
      .setNext(uppercaseCriterion)
      .setNext(numberCriterion)
      .setNext(specialCharCriterion)

    const score = lengthCriterion.verify(password)

    if (score <= 0) {
      return 'veryWeak'
    }
    if (score <= 2) {
      return 'weak'
    }
    if (score <= 3) {
      return 'moderate'
    }
    if (score <= 4) {
      return 'strong'
    }
    return 'veryStrong'
  }
}
