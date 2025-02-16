import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  SerializeOptions,
  UnauthorizedException,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { RequestWithUser } from 'src/auth/interfaces/request-with-user'
import { UserUpdateDto } from './dto/user-update.dto'
import { UserDto } from './dto/user.dto'
import { UsersService } from './users.service'
import { BalanceDto } from './dto/balance.dto'
import { FinancialSummaryDto } from './dto/financial-summary.dto'
import { MonthlyBalanceDto } from './dto/monthly-balance.dto'
import { TagSummaryDto } from './dto/tag-summary.dto'
import { BalanceHistoryItemDto } from './dto/balance-history.dto'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch(':id')
  @HttpCode(200)
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ type: UserDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Updates user',
    description:
      'This endpoint allows the user to update their details. Note that this requires authentication of user you are updating.'
  })
  @ApiBody({
    type: UserUpdateDto,
    description: 'User update dto'
  })
  @ApiOkResponse({
    description: 'Updated user',
    type: UserDto
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authorized to update this profile'
  })
  @ApiNotFoundResponse({
    description: 'User not found'
  })
  async updateUser(
    @Req() request: RequestWithUser,
    @Body() updateDto: UserUpdateDto,
    @Param('id') id: string
  ) {
    if (request.user.id !== id) throw new UnauthorizedException()
    const updatedUser = await this.usersService.updateUser(id, updateDto)
    return updatedUser
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Deletes user',
    description: 'Deletes a user account. This operation cannot be undone.'
  })
  @ApiNoContentResponse({
    description: 'User successfully deleted'
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authorized to delete this account'
  })
  @ApiNotFoundResponse({
    description: 'User not found'
  })
  async deleteUser(@Req() request: RequestWithUser, @Param('id') id: string) {
    if (request.user.id !== id) throw new UnauthorizedException()
    await this.usersService.deleteUser(id)
  }

  @Get(':id/balance')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get current balance',
    description:
      "Get user's current balance including total inflows and expenses"
  })
  @ApiOkResponse({
    description: "User's current balance",
    type: BalanceDto
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authorized to view this balance'
  })
  @ApiNotFoundResponse({
    description: 'User not found'
  })
  async getCurrentBalance(
    @Req() request: RequestWithUser,
    @Param('id') id: string
  ) {
    if (request.user.id !== id) throw new UnauthorizedException()
    return await this.usersService.getCurrentBalance(id)
  }

  @Get(':id/monthly-balance/:year')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get monthly balance',
    description: "Get user's monthly balance breakdown for a specific year"
  })
  @ApiParam({
    name: 'year',
    type: Number,
    description: 'Year for which to get statistics',
    example: 2024
  })
  @ApiOkResponse({
    description: 'Monthly balance breakdown',
    type: [MonthlyBalanceDto]
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authorized to view these statistics'
  })
  @ApiNotFoundResponse({
    description: 'User not found'
  })
  async getMonthlyBalance(
    @Req() request: RequestWithUser,
    @Param('id') id: string,
    @Param('year', ParseIntPipe) year: number
  ) {
    if (request.user.id !== id) throw new UnauthorizedException()
    return await this.usersService.getMonthlyBalance(id, year)
  }

  @Get(':id/financial-summary')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get financial summary',
    description:
      'Get comprehensive financial summary including balance and statistics'
  })
  @ApiOkResponse({
    description: 'Financial summary',
    type: FinancialSummaryDto
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authorized to view this financial summary'
  })
  @ApiNotFoundResponse({
    description: 'User not found'
  })
  async getFinancialSummary(
    @Req() request: RequestWithUser,
    @Param('id') id: string
  ) {
    if (request.user.id !== id) throw new UnauthorizedException()
    return await this.usersService.getFinancialSummary(id)
  }

  @Get(':id/top-tags')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get top tags',
    description: 'Get summary of top tags for both inflows and expenses'
  })
  @ApiOkResponse({
    description: 'Tag summary',
    type: TagSummaryDto
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authorized to view these tag statistics'
  })
  @ApiNotFoundResponse({
    description: 'User not found'
  })
  async getTopTags(@Req() request: RequestWithUser, @Param('id') id: string) {
    if (request.user.id !== id) {
      throw new UnauthorizedException()
    }
    return await this.usersService.getTopTags(id)
  }

  @Get(':id/balance-history')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get balance history',
    description:
      'Get complete history of monthly balances with cumulative totals for plotting trends'
  })
  @ApiOkResponse({
    description: 'Balance history with cumulative totals',
    type: [BalanceHistoryItemDto]
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authorized to view this balance history'
  })
  @ApiNotFoundResponse({
    description: 'User not found'
  })
  async getBalanceHistory(
    @Req() request: RequestWithUser,
    @Param('id') id: string
  ) {
    if (request.user.id !== id) {
      throw new UnauthorizedException()
    }
    return await this.usersService.getBalanceHistory(id)
  }
}
