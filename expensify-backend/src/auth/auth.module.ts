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

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret:
            configService.getOrThrow<string>('JWT_SECRET'),
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
