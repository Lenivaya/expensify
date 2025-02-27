import { Injectable } from '@nestjs/common'
import { DrizzleService } from '../database/drizzle.service'
import { TrackingConsentDto } from './dto/tracking-consent.dto'
import { UserActivityDto } from './dto/user-activity.dto'
import { userActivity, userConsent } from '../database/schema/analytics.schema'
import { eq } from 'drizzle-orm'
import { ActivityType } from './enums/activity-type.enum'

@Injectable()
export class AnalyticsService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async setUserConsent(
    userId: string,
    consent: TrackingConsentDto
  ): Promise<void> {
    await this.drizzleService.db
      .insert(userConsent)
      .values({
        userId,
        analytics: consent.analytics,
        social: consent.social,
        advertising: consent.advertising
      })
      .onConflictDoUpdate({
        target: userConsent.userId,
        set: {
          analytics: consent.analytics,
          social: consent.social,
          advertising: consent.advertising,
          updatedAt: new Date()
        }
      })
  }

  async trackUserActivity(activity: UserActivityDto): Promise<void> {
    const userConsents = await this.getUserConsent(activity.userId)

    if (this.shouldTrackActivity(userConsents, activity.action)) {
      await this.drizzleService.db.insert(userActivity).values({
        userId: activity.userId,
        action: activity.action,
        metadata: activity.metadata
      })
    }
  }

  async trackPageView(userId: string, page: string): Promise<void> {
    await this.trackUserActivity({
      userId,
      timestamp: new Date(),
      action: ActivityType.PAGE_VIEW,
      metadata: { page }
    })
  }

  async trackExpenseCreation(
    userId: string,
    amount: number,
    category: string
  ): Promise<void> {
    await this.trackUserActivity({
      userId,
      timestamp: new Date(),
      action: ActivityType.EXPENSE_CREATED,
      metadata: { amount, category }
    })
  }

  async trackBudgetUpdate(
    userId: string,
    oldAmount: number,
    newAmount: number
  ): Promise<void> {
    await this.trackUserActivity({
      userId,
      timestamp: new Date(),
      action: ActivityType.BUDGET_UPDATED,
      metadata: { oldAmount, newAmount }
    })
  }

  async getUserConsent(userId: string): Promise<TrackingConsentDto> {
    const [consent] = await this.drizzleService.db
      .select()
      .from(userConsent)
      .where(eq(userConsent.userId, userId))
      .limit(1)

    if (!consent) {
      return {
        analytics: false,
        social: false,
        advertising: false
      }
    }

    return {
      analytics: consent.analytics,
      social: consent.social,
      advertising: consent.advertising
    }
  }

  shouldTrackActivity(
    consent: TrackingConsentDto,
    activityType: ActivityType
  ): boolean {
    // Essential activities are always allowed (auth, errors)
    if (
      activityType === ActivityType.AUTH ||
      activityType === ActivityType.ERROR
    ) {
      return true
    }

    // Analytics-related activities
    if (
      (activityType === ActivityType.PAGE_VIEW ||
        activityType === ActivityType.EXPENSE_CREATED ||
        activityType === ActivityType.BUDGET_UPDATED) &&
      !consent.analytics
    ) {
      return false
    }

    // Social-related activities
    if (activityType === ActivityType.SOCIAL_SHARE && !consent.social) {
      return false
    }

    // Advertising-related activities
    if (activityType === ActivityType.AD_INTERACTION && !consent.advertising) {
      return false
    }

    return true
  }
}
