import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody
} from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RequestWithUser } from '../auth/interfaces/request-with-user'
import { AnalyticsService } from './analytics.service'
import { TrackingConsentDto } from './dto/tracking-consent.dto'
import { UserActivityDto } from './dto/user-activity.dto'

@ApiTags('Analytics')
@Controller('analytics')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('consent')
  @ApiOperation({
    summary: 'Get user consent settings',
    description:
      'Retrieves the current cookie and tracking consent settings for the user'
  })
  @ApiResponse({
    status: 200,
    description: 'User consent settings retrieved successfully',
    type: TrackingConsentDto
  })
  async getConsent(
    @Req() request: RequestWithUser
  ): Promise<TrackingConsentDto> {
    return await this.analyticsService.getUserConsent(request.user.id)
  }

  @Post('consent')
  @ApiOperation({
    summary: 'Update consent settings',
    description: "Updates the user's cookie and tracking consent preferences"
  })
  @ApiResponse({
    status: 200,
    description: 'Consent settings updated successfully'
  })
  @ApiBody({ type: TrackingConsentDto })
  async updateConsent(
    @Req() request: RequestWithUser,
    @Body() consentSettings: TrackingConsentDto
  ) {
    await this.analyticsService.setUserConsent(request.user.id, consentSettings)
    return { message: 'Consent settings updated successfully' }
  }

  @Post('track')
  @ApiOperation({
    summary: 'Track user activity',
    description: 'Records a user activity based on consent settings'
  })
  @ApiResponse({
    status: 201,
    description: 'Activity tracked successfully'
  })
  @ApiResponse({
    status: 403,
    description: 'Activity tracking not allowed due to consent settings'
  })
  @ApiBody({
    type: UserActivityDto,
    description: 'Activity details to track'
  })
  async trackActivity(
    @Req() request: RequestWithUser,
    @Body() activity: Omit<UserActivityDto, 'userId'>
  ) {
    await this.analyticsService.trackUserActivity({
      ...activity,
      userId: request.user.id,
      timestamp: activity.timestamp || new Date()
    })
    return { message: 'Activity tracked successfully' }
  }
}
