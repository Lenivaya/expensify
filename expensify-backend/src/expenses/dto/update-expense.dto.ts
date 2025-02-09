import { ApiProperty } from '@nestjs/swagger'
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator'

export class UpdateExpenseDto {
  @ApiProperty({
    description: 'Amount spent',
    example: 29.99,
    required: false
  })
  @IsNumber()
  @IsOptional()
  amount?: number

  @ApiProperty({
    description: 'Description of the expense',
    example: 'Grocery shopping',
    required: false
  })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({
    description: 'Tags for categorizing the expense',
    example: ['food', 'groceries'],
    type: [String],
    required: false
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[]
}
