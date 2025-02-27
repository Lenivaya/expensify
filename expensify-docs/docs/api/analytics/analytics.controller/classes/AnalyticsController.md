# Class: AnalyticsController

## Constructors

### new AnalyticsController()

> **new AnalyticsController**(`analyticsService`): [`AnalyticsController`](AnalyticsController.md)

#### Parameters

##### analyticsService

[`AnalyticsService`](../../analytics.service/classes/AnalyticsService.md)

#### Returns

[`AnalyticsController`](AnalyticsController.md)

## Methods

### getConsent()

> **getConsent**(`request`): `Promise`\<[`TrackingConsentDto`](../../dto/tracking-consent.dto/classes/TrackingConsentDto.md)\>

#### Parameters

##### request

[`RequestWithUser`](../../../auth/interfaces/request-with-user/interfaces/RequestWithUser.md)

#### Returns

`Promise`\<[`TrackingConsentDto`](../../dto/tracking-consent.dto/classes/TrackingConsentDto.md)\>

***

### updateConsent()

> **updateConsent**(`request`, `consentSettings`): `Promise`\<\{ `message`: `string`; \}\>

#### Parameters

##### request

[`RequestWithUser`](../../../auth/interfaces/request-with-user/interfaces/RequestWithUser.md)

##### consentSettings

[`TrackingConsentDto`](../../dto/tracking-consent.dto/classes/TrackingConsentDto.md)

#### Returns

`Promise`\<\{ `message`: `string`; \}\>

***

### trackActivity()

> **trackActivity**(`request`, `activity`): `Promise`\<\{ `message`: `string`; \}\>

#### Parameters

##### request

[`RequestWithUser`](../../../auth/interfaces/request-with-user/interfaces/RequestWithUser.md)

##### activity

`Omit`\<[`UserActivityDto`](../../dto/user-activity.dto/classes/UserActivityDto.md), `"userId"`\>

#### Returns

`Promise`\<\{ `message`: `string`; \}\>
