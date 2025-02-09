import { defineConfig } from 'drizzle-kit'
import { ConfigService } from '@nestjs/config'
import 'dotenv/config'

const configService = new ConfigService()

export default defineConfig({
  schema: './src/database/schema/',
  out: './src/database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: configService.getOrThrow('POSTGRES_HOST'),
    port: configService.getOrThrow('POSTGRES_PORT'),
    user: configService.getOrThrow('POSTGRES_USER'),
    password: configService.getOrThrow('POSTGRES_PASSWORD'),
    database: configService.getOrThrow('POSTGRES_DB'),
    ssl: false
  }
})
