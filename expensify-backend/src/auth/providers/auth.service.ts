import { BadRequestException, Injectable } from '@nestjs/common'
import { DrizzleService } from 'src/database/drizzle.service'
import { HashingService } from './hashing.service'
import { eq, or } from 'drizzle-orm'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { User, users } from 'src/database/schema/users.schema'
import { SignUpDto } from 'src/auth/dto/sign-up.dto'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly hashingService: HashingService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService
  ) {}
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

  private async signToken<T>(userId: string, payload?: T) {
    return await this.jwtService.signAsync({
      sub: userId,
      ...payload
    })
  }

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
