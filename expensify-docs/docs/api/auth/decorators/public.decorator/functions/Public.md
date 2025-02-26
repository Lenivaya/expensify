# Function: Public()

> **Public**(): `CustomDecorator`\<`string`\>

Decorator that marks a route as publicly accessible.

## Returns

`CustomDecorator`\<`string`\>

## Description

When applied to a route handler or controller, this decorator allows the endpoint
to be accessed without authentication, bypassing the JWT authentication guard.

## Example

```ts
// Make a single route public
@Public()
@Get('public-endpoint')
publicEndpoint() {
  return 'This endpoint is accessible without authentication';
}

// Make all routes in a controller public
@Public()
@Controller('public')
export class PublicController {
  // All routes in this controller will be public
}
```
