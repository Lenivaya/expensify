import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
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
import { CreateInflowDto } from './dto/create-inflow.dto'
import { UpdateInflowDto } from './dto/update-inflow.dto'
import { InflowsService } from './inflows.service'
import { InflowDto } from './dto/inflow.dto'
import { InflowSearchDto } from './dto/inflow-search.dto'
import { TagStatistics } from 'src/common/dto/tag-stats.dto'
import { MonthlyStats } from 'src/common/dto/month-stats.dto'

@ApiTags('Inflows')
@Controller('inflows')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class InflowsController {
  constructor(
    private readonly inflowsService: InflowsService
  ) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: 'Create inflow',
    description:
      'Create a new inflow for the authenticated user'
  })
  @ApiResponse({
    status: 201,
    description: 'The inflow has been successfully created',
    type: InflowDto
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authorized to create inflows'
  })
  async create(
    @Req() request: RequestWithUser,
    @Body() createInflowDto: CreateInflowDto
  ) {
    return await this.inflowsService.create(
      request.user.id,
      createInflowDto
    )
  }

  @Get()
  @ApiOperation({
    summary: 'Get all inflows',
    description:
      'Retrieve all inflows for the authenticated user with pagination and filtering options'
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
    description: 'List of inflows with pagination metadata',
    type: InflowSearchDto
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authorized to view inflows'
  })
  async findAll(
    @Req() request: RequestWithUser,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('tags') tags?: string[]
  ) {
    return await this.inflowsService.findAll(
      request.user.id,
      { page, limit, search, tags }
    )
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get inflow by ID',
    description: 'Retrieve a specific inflow by its ID'
  })
  @ApiOkResponse({
    description: 'The inflow details',
    type: InflowDto
  })
  @ApiUnauthorizedResponse({
    description:
      'User is not authorized to view this inflow'
  })
  @ApiNotFoundResponse({
    description: 'Inflow not found'
  })
  async findOne(
    @Req() request: RequestWithUser,
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return await this.inflowsService.findById(
      request.user.id,
      id
    )
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update inflow',
    description: 'Partially update an existing inflow by ID'
  })
  @ApiOkResponse({
    description: 'The inflow has been successfully updated',
    type: InflowDto
  })
  @ApiUnauthorizedResponse({
    description:
      'User is not authorized to update this inflow'
  })
  @ApiNotFoundResponse({
    description: 'Inflow not found'
  })
  async update(
    @Req() request: RequestWithUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateInflowDto: UpdateInflowDto
  ) {
    return await this.inflowsService.update(
      request.user.id,
      id,
      updateInflowDto
    )
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete inflow',
    description: 'Delete an inflow by ID'
  })
  @ApiOkResponse({
    description: 'The inflow has been successfully deleted',
    type: InflowDto
  })
  @ApiUnauthorizedResponse({
    description:
      'User is not authorized to delete this inflow'
  })
  @ApiNotFoundResponse({
    description: 'Inflow not found'
  })
  async remove(
    @Req() request: RequestWithUser,
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return await this.inflowsService.remove(
      request.user.id,
      id
    )
  }

  @Get('stats/total')
  @ApiOperation({
    summary: 'Get total inflow',
    description:
      'Get the total amount received across all inflows'
  })
  @ApiOkResponse({
    description: 'Total amount received',
    type: Number
  })
  @ApiUnauthorizedResponse({
    description:
      'User is not authorized to view total inflow'
  })
  async getTotalInflow(@Req() request: RequestWithUser) {
    return await this.inflowsService.getTotalInflow(
      request.user.id
    )
  }

  @Get('stats/tags')
  @ApiOperation({
    summary: 'Get tag statistics',
    description:
      'Get statistics about inflow tags including count and total amount'
  })
  @ApiOkResponse({
    description: 'Tag statistics',
    type: TagStatistics
  })
  @ApiUnauthorizedResponse({
    description:
      'User is not authorized to view tag statistics'
  })
  async getTagStats(@Req() request: RequestWithUser) {
    return await this.inflowsService.getTagStats(
      request.user.id
    )
  }

  @Get('stats/monthly/:year')
  @ApiOperation({
    summary: 'Get monthly statistics',
    description:
      'Get monthly inflow statistics for a specific year'
  })
  @ApiOkResponse({
    description: 'Monthly statistics',
    type: MonthlyStats
  })
  @ApiUnauthorizedResponse({
    description:
      'User is not authorized to view monthly statistics'
  })
  async getMonthlyStats(
    @Req() request: RequestWithUser,
    @Param('year') year: number
  ) {
    return await this.inflowsService.getMonthlyStats(
      request.user.id,
      year
    )
  }
}
