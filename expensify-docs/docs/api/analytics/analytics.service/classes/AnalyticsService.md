# Class: AnalyticsService

## Constructors

### new AnalyticsService()

> **new AnalyticsService**(`drizzleService`): [`AnalyticsService`](AnalyticsService.md)

#### Parameters

##### drizzleService

[`DrizzleService`](../../../database/drizzle.service/classes/DrizzleService.md)

#### Returns

[`AnalyticsService`](AnalyticsService.md)

## Methods

### setUserConsent()

> **setUserConsent**(`userId`, `consent`): `Promise`\<`void`\>

#### Parameters

##### userId

`string`

##### consent

[`TrackingConsentDto`](../../dto/tracking-consent.dto/classes/TrackingConsentDto.md)

#### Returns

`Promise`\<`void`\>

***

### trackUserActivity()

> **trackUserActivity**(`activity`): `Promise`\<`void`\>

#### Parameters

##### activity

[`UserActivityDto`](../../dto/user-activity.dto/classes/UserActivityDto.md)

#### Returns

`Promise`\<`void`\>

***

### trackPageView()

> **trackPageView**(`userId`, `page`): `Promise`\<`void`\>

#### Parameters

##### userId

`string`

##### page

`string`

#### Returns

`Promise`\<`void`\>

***

### trackExpenseCreation()

> **trackExpenseCreation**(`userId`, `amount`, `category`): `Promise`\<`void`\>

#### Parameters

##### userId

`string`

##### amount

`number`

##### category

`string`

#### Returns

`Promise`\<`void`\>

***

### trackBudgetUpdate()

> **trackBudgetUpdate**(`userId`, `oldAmount`, `newAmount`): `Promise`\<`void`\>

#### Parameters

##### userId

`string`

##### oldAmount

`number`

##### newAmount

`number`

#### Returns

`Promise`\<`void`\>

***

### getUserConsent()

> **getUserConsent**(`userId`): `Promise`\<[`TrackingConsentDto`](../../dto/tracking-consent.dto/classes/TrackingConsentDto.md)\>

#### Parameters

##### userId

`string`

#### Returns

`Promise`\<[`TrackingConsentDto`](../../dto/tracking-consent.dto/classes/TrackingConsentDto.md)\>

***

### shouldTrackActivity()

> **shouldTrackActivity**(`consent`, `activityType`): `boolean`

#### Parameters

##### consent

[`TrackingConsentDto`](../../dto/tracking-consent.dto/classes/TrackingConsentDto.md)

##### activityType

[`ActivityType`](../../enums/activity-type.enum/enumerations/ActivityType.md)

#### Returns

`boolean`
