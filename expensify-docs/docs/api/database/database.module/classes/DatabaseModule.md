# Class: DatabaseModule

Global module that provides database connectivity for the application.

## Description

This module is responsible for:
- Setting up and managing the PostgreSQL connection pool
- Providing the Drizzle ORM service for database operations
- Making database services available globally throughout the application

The module is configurable through the forRoot() method inherited from
ConfigurableDatabaseModule.

## Example

```ts
// In your app.module.ts
@Module({
  imports: [
    DatabaseModule.forRoot({
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'secret',
      database: 'expensify'
    })
  ]
})
export class AppModule {}
```

## Extends

- [`ConfigurableDatabaseModule`](../../database.module-definition/variables/ConfigurableDatabaseModule.md)

## Indexable

\[`key`: `string`\]: `any`

## Constructors

### new DatabaseModule()

> **new DatabaseModule**(): [`DatabaseModule`](DatabaseModule.md)

#### Returns

[`DatabaseModule`](DatabaseModule.md)

#### Inherited from

`ConfigurableDatabaseModule.constructor`

## Properties

### forRoot()

> `static` **forRoot**: (`options`) => `DynamicModule`

#### Parameters

##### options

[`DatabaseOptions`](../../database-options/interfaces/DatabaseOptions.md) & `Partial`\<\{\}\>

#### Returns

`DynamicModule`

#### Inherited from

`ConfigurableDatabaseModule.forRoot`

***

### forRootAsync()

> `static` **forRootAsync**: (`options`) => `DynamicModule`

#### Parameters

##### options

`ConfigurableModuleAsyncOptions`\<[`DatabaseOptions`](../../database-options/interfaces/DatabaseOptions.md), `"create"`\> & `Partial`\<\{\}\>

#### Returns

`DynamicModule`

#### Inherited from

`ConfigurableDatabaseModule.forRootAsync`
