import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'
import { IsString, IsNotEmpty } from 'class-validator'

/**
 * Data Transfer Object for user sign-in requests.
 *
 * @description
 * This DTO validates user credentials during the sign-in process.
 * It accepts either an email address or username as the login identifier,
 * along with the user's password.
 *
 * @example
 * // Using email
 * {
 *   login: "user@example.com",
 *   password: "z1Tlxb1tuXH7"
 * }
 *
 * // Using username
 * {
 *   login: "johndoe",
 *   password: "z1Tlxb1tuXH7"
 * }
 */
@Exclude()
export class SignInDto {
  /**
   * User's login identifier (email or username).
   * Can be either the user's email address or their username.
   *
   * @type {string}
   * @required
   * @example "user@example.com" or "johndoe"
   */
  @Expose()
  @ApiProperty({
    description: 'Login identifier (email or username)',
    example: 'user@example.com',
    minLength: 3
  })
  @IsNotEmpty()
  login: string

  /**
   * User's password for authentication.
   * Must match the hashed password stored in the database.
   *
   * @type {string}
   * @required
   * @minLength 8
   * @example "z1Tlxb1tuXH7"
   * @security Password is transmitted securely but should never be logged
   */
  @Expose()
  @ApiProperty({
    description: 'User password for authentication',
    example: 'z1Tlxb1tuXH7',
    minLength: 8
  })
  @IsString()
  @IsNotEmpty()
  password: string
}
