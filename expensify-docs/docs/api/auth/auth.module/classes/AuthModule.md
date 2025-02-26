# Class: AuthModule

Authentication module that provides user authentication and authorization.

## Description

This module handles all authentication-related functionality including:
- User sign-up and sign-in
- JWT token generation and validation
- Password hashing and verification
- Authentication guards and strategies

The module uses JWT for token-based authentication and bcrypt for password hashing.
It provides global authentication through JwtAuthGuard.

Configuration is handled through environment variables:
- JWT_SECRET: Secret key for JWT token signing
- JWT_TOKEN_TTL: Token time-to-live (default: 4 weeks)

## Example

```ts
// In your app.module.ts
@Module({
  imports: [
    AuthModule,
    // ... other modules
  ]
})
export class AppModule {}
```

## Constructors

### new AuthModule()

> **new AuthModule**(): [`AuthModule`](AuthModule.md)

#### Returns

[`AuthModule`](AuthModule.md)
