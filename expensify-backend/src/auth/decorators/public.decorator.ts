import { SetMetadata } from '@nestjs/common'

/**
 * Metadata key used to mark routes as public.
 * This key is used internally by the JwtAuthGuard to identify public routes.
 */
export const IS_PUBLIC_KEY = 'IS_PUBLIC'

/**
 * Decorator that marks a route as publicly accessible.
 *
 * @description
 * When applied to a route handler or controller, this decorator allows the endpoint
 * to be accessed without authentication, bypassing the JWT authentication guard.
 *
 * @example
 * // Make a single route public
 * @Public()
 * @Get('public-endpoint')
 * publicEndpoint() {
 *   return 'This endpoint is accessible without authentication';
 * }
 *
 * // Make all routes in a controller public
 * @Public()
 * @Controller('public')
 * export class PublicController {
 *   // All routes in this controller will be public
 * }
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)
