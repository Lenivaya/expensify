# Class: AppService

Core application service.

## Description

The AppService is the root service of the application, responsible for
application-wide functionality and core business logic that doesn't fit
into more specific feature modules.

## Example

```typescript
export class SomeComponent {
  constructor(private readonly appService: AppService) {}
}
```

## Constructors

### new AppService()

> **new AppService**(): [`AppService`](AppService.md)

#### Returns

[`AppService`](AppService.md)
