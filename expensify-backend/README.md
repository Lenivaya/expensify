# Backend

## Project setup

```bash
pnpm install
```

## Configure environment variables

```bash
cp .env.example .env

nvim .env
# or
code .env
```

### Environment Variables Reference

The following environment variables are available for configuration:

#### Database Configuration

- `POSTGRES_HOST` - PostgreSQL server host (default: localhost)
- `POSTGRES_PORT` - PostgreSQL server port (default: 5432)
- `POSTGRES_USER` - PostgreSQL username (default: postgres)
- `POSTGRES_PASSWORD` - PostgreSQL password (default: postgres)
- `POSTGRES_DB` - PostgreSQL database name (default: expensify)

#### Server Configuration

- `PORT` - Server port number (default: 3000)
- `HOST` - Server host address (default: 0.0.0.0)
- `COOKIE_SECRET` - Secret key for cookie signing

#### Authentication

- `JWT_SECRET` - Secret key for JWT token signing
- `JWT_TOKEN_TTL` - JWT token time-to-live duration (default: 7d)

## Database setup

Setup your postgres database by any way you want, or use the dev docker compose file from root of the project:

```bash
docker compose -f dev.docker-compose.yaml up -d
```

Then you can configure the database in the .env file.

### Apply migrations

To apply migrations, you can run the following command:

```bash
pnpm db:migrate
```

### Push migrations

If you want to quickly force apply your schema from code without creating new migrations, you can run the following command:

```bash
pnpm db:push
```

### Seed database

To seed database with some data to test the application, you can run the following command:

```bash
pnpm db:seed
```

## Compile and run the project

```bash
# development
pnpm start

# watch mode development
pnpm start:dev

# production mode
pnpm build && pnpm start:prod
```

### Docs

Backend API exposes OpenAPI documentation, which has two versions:

- swagger: https://localhost:3000/docs
- scalar api reference: https://localhost:3000/reference

Swagger is more conventional, when scalar api reference is more modern, user friendly and has more features like search, filtering, etc.

## tests

```bash
# unit tests
pnpm test

# e2e tests
pnpm test:e2e

# test coverage
pnpm test:cov
```
