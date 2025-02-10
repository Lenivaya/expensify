import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as Joi from 'joi'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { DatabaseModule } from './database/database.module'
import { UsersModule } from './users/users.module'
import { ExpensesModule } from './expenses/expenses.module'
import { InflowsModule } from './inflows/inflows.module'
import { CommonModule } from './common/common.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_TOKEN_TTL: Joi.string().required()
      })
    }),
    DatabaseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        host: configService.getOrThrow('POSTGRES_HOST'),
        port:
          configService.getOrThrow('POSTGRES_PORT') ?? 3000,
        user: configService.getOrThrow('POSTGRES_USER'),
        password: configService.getOrThrow(
          'POSTGRES_PASSWORD'
        ),
        database: configService.getOrThrow('POSTGRES_DB')
      })
    }),
    AuthModule,
    UsersModule,
    ExpensesModule,
    InflowsModule,
    CommonModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
