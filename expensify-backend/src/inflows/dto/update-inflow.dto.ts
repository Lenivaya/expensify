import { ApiProperty } from '@nestjs/swagger'
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator'

export class UpdateInflowDto {
  @ApiProperty({
    description: 'Amount received',
    example: 2500.0,
    required: false
  })
  @IsNumber()
  @IsOptional()
  amount?: number

  @ApiProperty({
    description: 'Description of the inflow',
    example: 'Monthly salary',
    required: false
  })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({
    description: 'Tags for categorizing the inflow',
    example: ['salary', 'work'],
    type: [String],
    required: false
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[]
}
