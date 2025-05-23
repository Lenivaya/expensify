import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  SerializeOptions,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger'
import { UserDto } from 'src/users/dto/user.dto'
import { UsersService } from 'src/users/users.service'
import { Public } from '../decorators/public.decorator'
import { SignInResponseDto } from '../dto/sign-in-response.dto'
import { SignInDto } from '../dto/sign-in.dto'
import { SignUpResponseDto } from '../dto/sign-up-response.dto'
import { SignUpDto } from '../dto/sign-up.dto'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { LocalAuthGuard } from '../guards/local-auth.guard'
import { RequestWithUser } from '../interfaces/request-with-user'
import { AuthService } from '../providers/auth.service'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ type: SignInResponseDto })
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Sign in a user',
    description:
      'This endpoint allows a user to sign in by providing valid credentials. On successful authentication, a token is generated and returned.'
  })
  @ApiBody({
    type: SignInDto,
    description: 'User sign-in credentials'
  })
  @ApiOkResponse({
    description: 'User successfully logged in',
    type: SignInResponseDto
  })
  async signIn(@Req() request: RequestWithUser) {
    const userId = request.user.id
    return await this.authService.generateTokens(userId)
  }

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ type: SignUpResponseDto })
  @Post('sign-up')
  @HttpCode(201)
  @ApiOperation({
    summary: 'Sign up a new user',
    description:
      'This endpoint allows a new user to sign up by providing necessary registration details. On successful registration, user details are returned.'
  })
  @ApiBody({
    type: SignUpDto,
    description: 'User sign-up details'
  })
  @ApiCreatedResponse({
    description: 'User successfully registered',
    type: SignUpResponseDto
  })
  async signUp(@Body() signUpDto: SignUpDto) {
    const user = await this.authService.signUp(signUpDto)
    return user
  }

  @Get('me')
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ type: UserDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get current user',
    description: 'This endpoint returns the current authenticated user.'
  })
  @ApiOkResponse({
    description: 'Current user details',
    type: UserDto
  })
  async getMe(@Req() request: RequestWithUser) {
    const user = await this.userService.findById(request.user.id)
    return user
  }
}
