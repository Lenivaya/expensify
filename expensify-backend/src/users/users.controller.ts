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
  ApiUnauthorizedResponse,
  ApiResponse
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

/**
 * Controller responsible for handling user-related HTTP requests in the Expensify application.
 *
 * This controller provides endpoints for managing user profiles and retrieving financial data
 * associated with users, including balance information, financial summaries, and transaction statistics.
 * All endpoints require authentication through JWT tokens and enforce authorization rules to ensure
 * users can only access their own data.
 *
 * The controller uses Swagger decorators to document the API endpoints for easy integration
 * with API documentation tools.
 */
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Updates a user's profile information.
   *
   * @param request - The HTTP request with authenticated user information
   * @param updateDto - The data to update in the user profile
   * @param id - The ID of the user to update
   * @returns The updated user information
   * @throws UnauthorizedException if the authenticated user is not the user being updated
   * @throws NotFoundException if the user is not found
   */
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

  /**
   * Deletes a user account.
   *
   * @param request - The HTTP request with authenticated user information
   * @param id - The ID of the user to delete
   * @throws UnauthorizedException if the authenticated user is not the user being deleted
   * @throws NotFoundException if the user is not found
   */
  @Delete(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete user account and all associated data',
    description: `Permanently deletes a user account and all associated data including:
    - Personal information
    - Financial records (expenses and inflows)
    - Analytics data and consent settings
    - Activity history

    This action cannot be undone. All data will be permanently erased in accordance with GDPR requirements.`
  })
  @ApiResponse({
    status: 200,
    description: 'User and all associated data successfully deleted',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User and all associated data successfully deleted'
        },
        deletedUserId: {
          type: 'string',
          example: 'user123'
        }
      }
    }
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authorized to delete this account'
  })
  @ApiNotFoundResponse({
    description: 'User not found'
  })
  async deleteUser(@Req() request: RequestWithUser, @Param('id') id: string) {
    if (request.user.id !== id) throw new UnauthorizedException()
    return await this.usersService.deleteUser(id)
  }

  /**
   * Retrieves the current balance for a user.
   *
   * @param request - The HTTP request with authenticated user information
   * @param id - The ID of the user to get the balance for
   * @returns The current balance information including total inflows, expenses, and net balance
   * @throws UnauthorizedException if the authenticated user is not the user whose balance is being requested
   * @throws NotFoundException if the user is not found
   */
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

  /**
   * Retrieves the monthly balance breakdown for a specific year.
   *
   * @param request - The HTTP request with authenticated user information
   * @param year - The year for which to retrieve monthly balance data
   * @returns An array of monthly balance records for the specified year
   * @throws UnauthorizedException if not properly authenticated
   */
  @Get('monthly-balance/:year')
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
    @Param('year', ParseIntPipe) year: number
  ) {
    return await this.usersService.getMonthlyBalance(request.user.id, year)
  }

  /**
   * Retrieves a comprehensive financial summary for the authenticated user.
   *
   * @param request - The HTTP request with authenticated user information
   * @returns A financial summary including current balance and statistical analysis
   * @throws UnauthorizedException if not properly authenticated
   */
  @Get('financial-summary')
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
  async getFinancialSummary(@Req() request: RequestWithUser) {
    return await this.usersService.getFinancialSummary(request.user.id)
  }

  /**
   * Retrieves a summary of the top tags used by the authenticated user.
   *
   * @param request - The HTTP request with authenticated user information
   * @returns A summary of top tags for both inflows and expenses
   * @throws UnauthorizedException if not properly authenticated
   */
  @Get('top-tags')
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
  async getTopTags(@Req() request: RequestWithUser) {
    return await this.usersService.getTopTags(request.user.id)
  }

  /**
   * Retrieves the complete balance history for the authenticated user.
   *
   * @param request - The HTTP request with authenticated user information
   * @returns An array of balance history records with cumulative totals
   * @throws UnauthorizedException if not properly authenticated
   */
  @Get('balance-history')
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
  async getBalanceHistory(@Req() request: RequestWithUser) {
    return await this.usersService.getBalanceHistory(request.user.id)
  }
}
