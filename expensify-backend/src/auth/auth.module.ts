import { JwtModule } from '@nestjs/jwt'
import { Module } from '@nestjs/common'
import { AuthService } from './providers/auth.service'
import { AuthController } from './controllers/auth.controller'
import { ConfigService } from '@nestjs/config'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'
import { HashingService } from './providers/hashing.service'
import { BcryptService } from './providers/bcrypt.service'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { UsersModule } from 'src/users/users.module'

/**
 * Authentication module that provides user authentication and authorization.
 *
 * @description
 * This module handles all authentication-related functionality including:
 * - User sign-up and sign-in
 * - JWT token generation and validation
 * - Password hashing and verification
 * - Authentication guards and strategies
 *
 * The module uses JWT for token-based authentication and bcrypt for password hashing.
 * It provides global authentication through JwtAuthGuard.
 *
 * Configuration is handled through environment variables:
 * - JWT_SECRET: Secret key for JWT token signing
 * - JWT_TOKEN_TTL: Token time-to-live (default: 4 weeks)
 *
 * @example
 * // In your app.module.ts
 * @Module({
 *   imports: [
 *     AuthModule,
 *     // ... other modules
 *   ]
 * })
 * export class AppModule {}
 */
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.getOrThrow<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.getOrThrow<string>(
              'JWT_TOKEN_TTL',
              '4weeks'
            )
          }
        }
      },
      inject: [ConfigService]
    }),
    UsersModule
  ],
  providers: [
    { provide: HashingService, useClass: BcryptService },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    AuthService,
    LocalStrategy,
    JwtStrategy
  ],
  controllers: [AuthController]
})
export class AuthModule {}
