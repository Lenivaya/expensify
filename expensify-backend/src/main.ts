import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
  FastifyAdapter,
  type NestFastifyApplication
} from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { patchNestJsSwagger } from 'nestjs-zod'
import { apiReference } from '@scalar/nestjs-api-reference'
import { writeFile } from 'fs/promises'
import * as yaml from 'js-yaml'
import cookie from '@fastify/cookie'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true
    }),
    {
      logger: ['error', 'warn', 'log', 'debug', 'verbose']
    }
  )

  // Register cookie plugin
  await app.register(cookie, {
    secret: process.env.COOKIE_SECRET || 'your-secret-key',
    hook: 'onRequest',
    parseOptions: {}
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  )

  patchNestJsSwagger()

  const config = new DocumentBuilder()
    .setTitle('Expensify')
    .setDescription('Expensify API')
    .setVersion('1.0')
    .addTag('expensify')
    .addBearerAuth()
    .addServer('{server}', 'Server URL', {
      server: {
        default: 'http://localhost:3000',
        description: 'Server identifier'
      }
    })
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document, {})
  await Promise.all([
    writeFile('./openapi-spec.yaml', yaml.dump(document), {
      encoding: 'utf8'
    })
  ])

  app.use(
    '/reference',
    apiReference({
      withFastify: true,
      spec: {
        content: document
      }
    })
  )

  app.enableCors()

  const host = process.env.HOST || '0.0.0.0'
  const port = parseInt(process.env.PORT || '3000', 10)

  await app.listen(port, host)
  console.log(`Application is running on: http://${host}:${port}`)
  console.log(`Swagger docs available at: http://${host}:${port}/docs`)
  console.log(`API Reference available at: http://${host}:${port}/reference`)
}

bootstrap().catch((error) => {
  console.error('Failed to start the application:', error)
  process.exit(1)
})
