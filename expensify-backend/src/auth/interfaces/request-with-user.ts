import { FastifyRequest } from 'fastify'

/**
 * Represents the authenticated user's payload in JWT token.
 *
 * @description
 * This type defines the structure of the user information that is
 * extracted from the JWT token and attached to authenticated requests.
 * Contains only essential user identification data.
 *
 * @property {string} id - Unique identifier of the authenticated user
 *
 * @example
 * {
 *   id: "550e8400-e29b-41d4-a716-446655440000"
 * }
 */
export type UserPayload = {
  /**
   * Unique identifier of the authenticated user (UUID v4)
   * @type {string}
   */
  id: string
}

/**
 * Extended Fastify request type that includes authenticated user data.
 *
 * @description
 * This interface extends the base FastifyRequest to include the authenticated
 * user's information. It's used throughout the application to access the
 * current user's data in route handlers and middleware.
 *
 * The user property is populated by the JWT authentication guard after
 * successful token validation.
 *
 * @example
 * async function handler(request: RequestWithUser) {
 *   const userId = request.user.id;
 *   // Use userId to fetch user-specific data
 * }
 */
export interface RequestWithUser extends FastifyRequest {
  /**
   * Authenticated user information extracted from JWT token
   * @type {UserPayload}
   */
  user: UserPayload
}
