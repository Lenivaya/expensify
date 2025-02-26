import { ApiProperty } from '@nestjs/swagger'

/**
 * Data Transfer Object for successful user registration response.
 *
 * @description
 * This DTO represents the response sent back to the client after
 * successful user registration. It includes the user's ID which
 * can be used for subsequent operations.
 *
 * @example
 * {
 *   id: "550e8400-e29b-41d4-a716-446655440000"
 * }
 */
export class SignUpResponseDto {
  /**
   * Unique identifier of the newly registered user.
   *
   * @type {string}
   * @format uuid
   * @required
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  @ApiProperty({
    description: 'Unique identifier (UUID) of the newly registered user',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  id: string

  @ApiProperty({
    description: 'Email of the user'
  })
  email: string
}
