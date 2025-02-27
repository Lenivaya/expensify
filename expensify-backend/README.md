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

## tests

```bash
# unit tests
pnpm test

# e2e tests
pnpm test:e2e

# test coverage
pnpm test:cov
```
