import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'

/**
 * Data Transfer Object for successful sign-in response.
 *
 * @description
 * This DTO represents the response sent back to the client after
 * successful authentication. It contains the JWT access token that
 * should be used for subsequent authenticated requests.
 *
 * The token should be included in the Authorization header as:
 * `Authorization: Bearer {token}`
 *
 * @example
 * {
 *   accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * }
 */
@Exclude()
export class SignInResponseDto {
  /**
   * JWT access token for authenticated requests.
   * Valid for the duration specified in JWT_TOKEN_TTL.
   *
   * @type {string}
   * @required
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  @Expose()
  @ApiProperty({
    description: 'JWT access token for authentication',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  accessToken: string

  @ApiProperty({
    description: 'The refresh token for the user',
    example: 'dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4gZXhhbXBsZQ=='
  })
  readonly refreshToken: string
}
