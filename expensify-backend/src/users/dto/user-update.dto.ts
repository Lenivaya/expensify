import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'

@Exclude()
export class UserUpdateDto {
  @Expose()
  @ApiProperty({
    description: 'Username of the user to update',
    example: 'johnydoe',
    required: false
  })
  @IsString()
  @IsOptional()
  username?: string

  @Expose()
  @ApiProperty({
    description: 'First name of the user to update',
    example: 'John',
    required: false
  })
  @IsString()
  @IsOptional()
  firstName?: string

  @Expose()
  @ApiProperty({
    description: 'Last name of the user to update',
    example: 'Doe',
    required: false
  })
  @IsString()
  @IsOptional()
  lastName?: string
}
