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
    new FastifyAdapter(),
    {
      logger: ['error', 'warn', 'log', 'debug', 'verbose']
    }
  )

  // Register cookie plugin
  await app.register(cookie, {
    secret: process.env.COOKIE_SECRET || 'your-secret-key', // You should set this in your environment variables
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
  await app.listen(process.env.PORT ?? 3000)
}

bootstrap()
  .catch(console.error)
  .finally(() => console.log('Server started'))
