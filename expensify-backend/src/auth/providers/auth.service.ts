import { BadRequestException, Injectable } from '@nestjs/common'
import { DrizzleService } from 'src/database/drizzle.service'
import { HashingService } from './hashing.service'
import { eq, or } from 'drizzle-orm'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { User, users } from 'src/database/schema/users.schema'
import { SignUpDto } from 'src/auth/dto/sign-up.dto'
import { UsersService } from 'src/users/users.service'

/**
 * Service responsible for handling authentication-related operations.
 *
 * @description
 * The AuthService provides functionality for:
 * - User validation during sign-in
 * - User registration (sign-up)
 * - JWT token generation and management
 *
 * It integrates with:
 * - DrizzleService for database operations
 * - HashingService for password encryption
 * - JwtService for token management
 * - UsersService for user-related operations
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly hashingService: HashingService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService
  ) {}

  /**
   * Validates user credentials during sign-in.
   *
   * @param login - The user's email or username
   * @param password - The user's password (plain text)
   * @returns Promise resolving to the validated User object
   * @throws BadRequestException if credentials are invalid
   */
  async validateUser(login: string, password: string): Promise<User> {
    const user = await this.userService.findByLogin(login)

    if (!user) {
      throw new BadRequestException('Invalid credentials')
    }

    const isPasswordValid = await this.hashingService.compare(
      password,
      user.password
    )
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials')
    }

    return user
  }

  /**
   * Registers a new user in the system.
   *
   * @param signUpDto - Data transfer object containing user registration details
   * @returns Promise resolving to the newly created user
   * @throws BadRequestException if email is already in use
   */
  async signUp(signUpDto: SignUpDto) {
    const hashedPassword = await this.hashingService.hash(signUpDto.password)

    const userWithEmail = await this.userService.findByEmail(signUpDto.email)
    if (userWithEmail) {
      throw new BadRequestException('Email already used')
    }

    // create new user
    const [user] = await this.drizzleService.db
      .insert(users)
      .values({
        ...signUpDto,
        password: hashedPassword
      })
      .returning()

    return user
  }

  /**
   * Signs a JWT token with user-specific payload.
   *
   * @param userId - The ID of the user to generate token for
   * @param payload - Optional additional payload to include in the token
   * @returns Promise resolving to the signed JWT token
   * @private
   */
  private async signToken<T>(userId: string, payload?: T) {
    return await this.jwtService.signAsync({
      sub: userId,
      ...payload
    })
  }

  /**
   * Generates authentication tokens for a user.
   *
   * @param userId - The ID of the user to generate tokens for
   * @returns Promise resolving to an object containing the access token
   * @throws Error if user is not found
   */
  async generateTokens(userId: string) {
    const [user] = await this.drizzleService.db
      .select()
      .from(users)
      .where(eq(users.id, userId))
    const [accessToken] = await Promise.all([
      await this.signToken(user.id, {
        email: user.email
      })
    ])

    return {
      accessToken
    }
  }
}
