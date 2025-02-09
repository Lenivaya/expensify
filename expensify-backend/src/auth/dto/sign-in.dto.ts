import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'
import { IsString, IsNotEmpty } from 'class-validator'

@Exclude()
export class SignInDto {
  @Expose()
  @ApiProperty({
    description:
      'Login of the user, could be either his email or username',
    example: 'user@example.com'
  })
  @IsNotEmpty()
  login: string

  @Expose()
  @ApiProperty({
    description: 'The password of the user',
    example: 'z1Tlxb1tuXH7'
  })
  @IsString()
  @IsNotEmpty()
  password: string
}
