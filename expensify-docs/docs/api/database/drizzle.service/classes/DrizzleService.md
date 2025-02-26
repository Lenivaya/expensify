# Class: DrizzleService

Service that provides access to the Drizzle ORM instance.

## Description

This service initializes and manages the Drizzle ORM connection to PostgreSQL.
It wraps the connection pool with Drizzle ORM functionality and provides
type-safe database operations through the schema definition.

## Example

```ts
// Inject and use the service
class YourService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async findUser(id: string) {
    return await this.drizzleService.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, id)
    });
  }
}
```

## Constructors

### new DrizzleService()

> **new DrizzleService**(`pool`): [`DrizzleService`](DrizzleService.md)

Creates a new DrizzleService instance.

#### Parameters

##### pool

`Pool`

The PostgreSQL connection pool

#### Returns

[`DrizzleService`](DrizzleService.md)

## Properties

### db

> **db**: `NodePgDatabase`\<\{ `users`: `PgTableWithColumns`\<\{\}\>; `expenses`: `PgTableWithColumns`\<\{\}\>; `inflows`: `PgTableWithColumns`\<\{\}\>; \}\>

The Drizzle ORM database instance.
Provides type-safe access to all database operations.
