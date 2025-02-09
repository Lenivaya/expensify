import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RequestWithUser } from '../auth/interfaces/request-with-user'
import { CreateExpenseDto } from './dto/create-expense.dto'
import { ExpenseDto } from './dto/expense.dto'
import { ExpenseSearchDto } from './dto/expenses-search.dto'
import { UpdateExpenseDto } from './dto/update-expense.dto'
import { ExpensesService } from './expenses.service'
import { TagStatistics } from 'src/common/dto/tag-stats.dto'
import { MonthlyStats } from 'src/common/dto/month-stats.dto'

@ApiTags('Expenses')
@Controller('expenses')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class ExpensesController {
  constructor(
    private readonly expensesService: ExpensesService
  ) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: 'Create expense',
    description:
      'Create a new expense for the authenticated user'
  })
  @ApiResponse({
    status: 201,
    description:
      'The expense has been successfully created',
    type: ExpenseDto
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authorized to create expenses'
  })
  async create(
    @Req() request: RequestWithUser,
    @Body() createExpenseDto: CreateExpenseDto
  ) {
    return await this.expensesService.create(
      request.user.id,
      createExpenseDto
    )
  }

  @Get()
  @ApiOperation({
    summary: 'Get all expenses',
    description:
      'Retrieve all expenses for the authenticated user with pagination and filtering options'
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String
  })
  @ApiQuery({
    name: 'tags',
    required: false,
    type: [String]
  })
  @ApiOkResponse({
    description:
      'List of expenses with pagination metadata',
    type: ExpenseSearchDto
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authorized to view expenses'
  })
  async findAll(
    @Req() request: RequestWithUser,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('tags') tags?: string[]
  ) {
    return await this.expensesService.findAll(
      request.user.id,
      { page, limit, search, tags }
    )
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get expense by ID',
    description: 'Retrieve a specific expense by its ID'
  })
  @ApiOkResponse({
    description: 'The expense details',
    type: ExpenseDto
  })
  @ApiUnauthorizedResponse({
    description:
      'User is not authorized to view this expense'
  })
  @ApiNotFoundResponse({
    description: 'Expense not found'
  })
  async findOne(
    @Req() request: RequestWithUser,
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return await this.expensesService.findById(
      request.user.id,
      id
    )
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update expense',
    description: 'Update an existing expense by ID'
  })
  @ApiOkResponse({
    description:
      'The expense has been successfully updated',
    type: ExpenseDto
  })
  @ApiUnauthorizedResponse({
    description:
      'User is not authorized to update this expense'
  })
  @ApiNotFoundResponse({
    description: 'Expense not found'
  })
  async update(
    @Req() request: RequestWithUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateExpenseDto: UpdateExpenseDto
  ) {
    return await this.expensesService.update(
      request.user.id,
      id,
      updateExpenseDto
    )
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete expense',
    description: 'Delete an expense by ID'
  })
  @ApiOkResponse({
    description:
      'The expense has been successfully deleted',
    type: ExpenseDto
  })
  @ApiUnauthorizedResponse({
    description:
      'User is not authorized to delete this expense'
  })
  @ApiNotFoundResponse({
    description: 'Expense not found'
  })
  async remove(
    @Req() request: RequestWithUser,
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return await this.expensesService.remove(
      request.user.id,
      id
    )
  }

  @Get('stats/total')
  @ApiOperation({
    summary: 'Get total spent',
    description:
      'Get the total amount spent across all expenses'
  })
  @ApiOkResponse({
    description: 'Total amount spent',
    type: Number
  })
  @ApiUnauthorizedResponse({
    description:
      'User is not authorized to view total spent'
  })
  async getTotalSpent(@Req() request: RequestWithUser) {
    return await this.expensesService.getTotalSpent(
      request.user.id
    )
  }

  @Get('stats/tags')
  @ApiOperation({
    summary: 'Get tag statistics',
    description:
      'Get statistics about expense tags including count and total amount'
  })
  @ApiOkResponse({
    description: 'Tag statistics',
    type: [TagStatistics]
  })
  @ApiUnauthorizedResponse({
    description:
      'User is not authorized to view tag statistics'
  })
  async getTagStats(@Req() request: RequestWithUser) {
    return await this.expensesService.getTagStats(
      request.user.id
    )
  }

  @Get('stats/monthly/:year')
  @ApiOperation({
    summary: 'Get monthly statistics',
    description:
      'Get monthly expense statistics for a specific year'
  })
  @ApiOkResponse({
    description: 'Monthly statistics',
    type: [MonthlyStats]
  })
  @ApiUnauthorizedResponse({
    description:
      'User is not authorized to view monthly statistics'
  })
  async getMonthlyStats(
    @Req() request: RequestWithUser,
    @Param('year') year: number
  ) {
    return await this.expensesService.getMonthlyStats(
      request.user.id,
      year
    )
  }
}
