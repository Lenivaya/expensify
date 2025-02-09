import { ApiProperty } from '@nestjs/swagger'
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString
} from 'class-validator'

export class CreateExpenseDto {
  @ApiProperty({
    description: 'Amount spent',
    example: 29.99
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number

  @ApiProperty({
    description: 'Description of the expense',
    example: 'Grocery shopping'
  })
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty({
    description: 'Tags for categorizing the expense',
    example: ['food', 'groceries'],
    type: [String]
  })
  @IsArray()
  @IsString({ each: true })
  tags: string[]
}
