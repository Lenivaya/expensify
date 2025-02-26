# Class: LocalAuthGuard

Guard that implements local (username/password) authentication.

## Description

This guard extends Passport's local authentication guard to protect routes
that require username/password authentication. It is typically used for
login endpoints where users provide their credentials.

Features:
- Implements username/password authentication
- Integrates with LocalStrategy for credential validation
- Automatically handles authentication failures

## Example

```ts
// Login endpoint using local authentication
@UseGuards(LocalAuthGuard)
@Post('login')
async login(@Request() req) {
  return this.authService.login(req.user);
}
```

## Extends

- `IAuthGuard`

## Constructors

### new LocalAuthGuard()

> **new LocalAuthGuard**(...`args`): [`LocalAuthGuard`](LocalAuthGuard.md)

#### Parameters

##### args

...`any`[]

#### Returns

[`LocalAuthGuard`](LocalAuthGuard.md)

#### Inherited from

`AuthGuard('local').constructor`
