import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'

/**
 * Guard that protects routes with JWT authentication.
 *
 * @description
 * This guard extends Passport's JWT authentication guard and adds support for public routes.
 * Routes can be marked as public using the @Public() decorator to bypass authentication.
 *
 * Features:
 * - Automatically validates JWT tokens on protected routes
 * - Supports public route exceptions via @Public() decorator
 * - Integrates with NestJS's dependency injection system
 *
 * @example
 * // Make a route public
 * @Public()
 * @Get('public-endpoint')
 * publicEndpoint() {
 *   return 'This endpoint is public';
 * }
 *
 * // Protected route (default behavior)
 * @Get('protected-endpoint')
 * protectedEndpoint() {
 *   return 'This endpoint requires authentication';
 * }
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * Creates an instance of JwtAuthGuard.
   *
   * @param reflector - NestJS reflector for accessing metadata
   */
  constructor(private reflector: Reflector) {
    super()
  }

  /**
   * Determines if the current request can activate the route.
   *
   * @param context - Execution context containing request details
   * @returns True if the route is public or if JWT authentication succeeds
   */
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if (isPublic) {
      return true
    }
    return super.canActivate(context)
  }
}
