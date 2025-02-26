# Interface: DatabaseOptions

Configuration options for database connection.

## Description

This interface defines the required configuration parameters
for establishing a connection to the PostgreSQL database.
All fields are required to ensure proper database connectivity.

## Example

```ts
{
 *   host: 'localhost',
 *   port: 5432,
 *   user: 'postgres',
 *   password: 'secret',
 *   database: 'expensify'
 * }
```

## Properties

### host

> **host**: `string`

The hostname where the PostgreSQL server is running

#### Example

```ts
'localhost' or '127.0.0.1'
```

***

### port

> **port**: `number`

The port number on which PostgreSQL is listening

#### Example

```ts
5432
```

***

### user

> **user**: `string`

The username to authenticate with the database

#### Example

```ts
'postgres'
```

***

### password

> **password**: `string`

The password for database authentication

#### Example

```ts
'secret'
```

#### Security

This should be stored securely and never exposed

***

### database

> **database**: `string`

The name of the database to connect to

#### Example

```ts
'expensify'
```
