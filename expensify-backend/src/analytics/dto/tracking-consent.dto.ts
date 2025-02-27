import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty } from 'class-validator'

export class TrackingConsentDto {
  @ApiProperty({
    description: 'Consent for analytics and usage tracking',
    example: false,
    default: false
  })
  @IsBoolean()
  @IsNotEmpty()
  analytics!: boolean

  @ApiProperty({
    description: 'Consent for social media features and sharing',
    example: false,
    default: false
  })
  @IsBoolean()
  @IsNotEmpty()
  social!: boolean

  @ApiProperty({
    description: 'Consent for personalized advertising',
    example: false,
    default: false
  })
  @IsBoolean()
  @IsNotEmpty()
  advertising!: boolean
}
