import { ApiProperty } from '@nestjs/swagger'
import { ActivityType } from '../enums/activity-type.enum'

export class UserActivityDto {
  @ApiProperty({
    description: 'ID of the user performing the activity',
    example: 'user123'
  })
  userId!: string

  @ApiProperty({
    description: 'Timestamp when the activity occurred',
    example: '2024-03-15T12:00:00Z'
  })
  timestamp!: Date

  @ApiProperty({
    description: 'Type of activity performed',
    enum: ActivityType,
    enumName: 'ActivityType',
    example: ActivityType.PAGE_VIEW
  })
  action!: ActivityType

  @ApiProperty({
    description: 'Additional data related to the activity',
    example: { page: '/dashboard', amount: 100, category: 'food' },
    type: 'object',
    additionalProperties: true
  })
  metadata!: Record<string, any>
}
