import { Optional } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'

/**
 * Data Transfer Object for user registration requests.
 *
 * @description
 * This DTO validates new user registration data. It includes required fields
 * like username, email, and password, as well as optional personal information
 * like first and last name.
 *
 * All fields are validated according to specific rules:
 * - Username must be unique and string
 * - Email must be valid and unique
 * - Password must be at least 8 characters
 * - Names are optional but must be strings if provided
 *
 * @example
 * {
 *   username: "johndoe",
 *   firstName: "John",
 *   lastName: "Doe",
 *   email: "john.doe@example.com",
 *   password: "z1Tlxb1tuXH7"
 * }
 */
export class SignUpDto {
  /**
   * Unique username for the new user.
   * Used for identification and login.
   *
   * @type {string}
   * @required
   * @minLength 3
   * @example "johndoe"
   */
  @ApiProperty({
    description: 'Unique username for identification',
    example: 'johndoe',
    minLength: 3
  })
  @IsString()
  username: string

  /**
   * User's first name.
   * Optional personal information.
   *
   * @type {string}
   * @optional
   * @example "John"
   */
  @ApiProperty({
    description: "User's first name (optional)",
    example: 'John'
  })
  @IsString()
  @Optional()
  firstName: string

  /**
   * User's last name.
   * Optional personal information.
   *
   * @type {string}
   * @optional
   * @example "Doe"
   */
  @ApiProperty({
    description: "User's last name (optional)",
    example: 'Doe'
  })
  @IsString()
  @Optional()
  lastName: string

  /**
   * User's email address.
   * Must be unique and valid email format.
   * Used for account verification and communication.
   *
   * @type {string}
   * @required
   * @format email
   * @example "john.doe@example.com"
   */
  @ApiProperty({
    description: 'Valid and unique email address',
    example: 'user@example.com'
  })
  @IsEmail()
  email: string

  /**
   * User's password for authentication.
   * Must be at least 8 characters long.
   *
   * @type {string}
   * @required
   * @minLength 8
   * @example "z1Tlxb1tuXH7"
   * @security Password will be hashed before storage
   */
  @ApiProperty({
    description: 'User password (min 8 characters)',
    example: 'z1Tlxb1tuXH7',
    minLength: 8
  })
  @IsString()
  @MinLength(8)
  password: string
}
