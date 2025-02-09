import { Optional } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsString,
  MinLength
} from 'class-validator'

export class SignUpDto {
  @ApiProperty({
    description: 'Username of the user',
    example: 'johnydoe'
  })
  @IsString()
  username: string

  @ApiProperty({
    description: 'First name of the new user',
    example: 'John'
  })
  @IsString()
  @Optional()
  firstName: string

  @ApiProperty({
    description: 'Last name of the new user',
    example: 'Doe'
  })
  @IsString()
  @Optional()
  lastName: string

  @ApiProperty({
    description: 'Email of the new user',
    example: 'user@example.com'
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: 'Password of the new user',
    example: 'z1Tlxb1tuXH7',
    minLength: 6
  })
  @IsString()
  @MinLength(8)
  password: string
}
