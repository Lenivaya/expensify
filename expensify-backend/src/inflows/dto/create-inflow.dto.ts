import { ApiProperty } from '@nestjs/swagger'
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString
} from 'class-validator'

export class CreateInflowDto {
  @ApiProperty({
    description: 'Amount received',
    example: 2500.0
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number

  @ApiProperty({
    description: 'Description of the inflow',
    example: 'Monthly salary'
  })
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty({
    description: 'Tags for categorizing the inflow',
    example: ['salary', 'work'],
    type: [String]
  })
  @IsArray()
  @IsString({ each: true })
  tags: string[]
}
