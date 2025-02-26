import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

/**
 * JWT authentication strategy for Passport.
 *
 * @description
 * This strategy implements JWT token validation and extraction from requests.
 * It is used by the authentication guards to protect routes that require authentication.
 *
 * Configuration:
 * - Extracts JWT from the Authorization header using the Bearer scheme
 * - Validates token expiration
 * - Uses JWT_SECRET from environment variables for token verification
 *
 * @example
 * // Protected route using JWT authentication
 * @UseGuards(JwtAuthGuard)
 * @Get('profile')
 * getProfile(@Request() req) {
 *   return req.user;
 * }
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * Configures the JWT strategy with the necessary options.
   *
   * @param configService - NestJS config service for accessing environment variables
   */
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('JWT_SECRET')
    })
  }

  /**
   * Validates and transforms the JWT payload into a user object.
   *
   * @param payload - The decoded JWT payload
   * @returns An object containing the user ID extracted from the payload
   */
  validate(payload: any) {
    return { id: payload.sub }
  }
}
