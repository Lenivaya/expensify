import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { AuthService } from '../providers/auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy
) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'login'
    })
  }

  async validate(login: string, password: string) {
    console.log('login', login)
    const user = await this.authService.validateUser(
      login,
      password
    )
    return user
  }
}
