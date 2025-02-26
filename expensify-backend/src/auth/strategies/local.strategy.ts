import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { AuthService } from '../providers/auth.service'

/**
 * Local authentication strategy for Passport.
 *
 * @description
 * This strategy implements username/password (local) authentication.
 * It is used primarily for the initial user login process.
 *
 * Configuration:
 * - Uses 'login' field instead of default 'username' field
 * - Integrates with AuthService for user validation
 *
 * @example
 * // Route using local authentication
 * @UseGuards(LocalAuthGuard)
 * @Post('login')
 * async login(@Request() req) {
 *   return this.authService.login(req.user);
 * }
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  /**
   * Configures the local strategy with custom field names.
   *
   * @param authService - Service handling user authentication
   */
  constructor(private authService: AuthService) {
    super({
      usernameField: 'login'
    })
  }

  /**
   * Validates user credentials against the database.
   *
   * @param login - The user's login (email or username)
   * @param password - The user's password
   * @returns Promise resolving to the authenticated user
   * @throws BadRequestException if credentials are invalid
   */
  async validate(login: string, password: string) {
    const user = await this.authService.validateUser(login, password)
    return user
  }
}
