export enum ActivityType {
  // Essential activities (always allowed)
  AUTH = 'AUTH',
  ERROR = 'ERROR',

  // Analytics-related activities
  PAGE_VIEW = 'PAGE_VIEW',
  EXPENSE_CREATED = 'EXPENSE_CREATED',
  BUDGET_UPDATED = 'BUDGET_UPDATED',

  // Social-related activities
  SOCIAL_SHARE = 'SOCIAL_SHARE',
  SOCIAL_LIKE = 'SOCIAL_LIKE',
  SOCIAL_COMMENT = 'SOCIAL_COMMENT',

  // Advertising-related activities
  AD_INTERACTION = 'AD_INTERACTION',
  AD_CLICK = 'AD_CLICK',
  AD_IMPRESSION = 'AD_IMPRESSION'
}
