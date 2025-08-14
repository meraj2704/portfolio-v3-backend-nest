import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TechnologyService } from './technology.service';
import { TechnologyDto } from './dto/technology.dto';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Technologies')
@Controller('technologies')
export class TechnologyController {
  constructor(private readonly technologyService: TechnologyService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Create a new technology' })
  @ApiResponse({
    status: 201,
    description: 'Technology created successfully',
    type: TechnologyDto,
  })
  @ApiResponse({ status: 409, description: 'Technology name already exists' })
  @ApiBody({ type: CreateTechnologyDto })
  async create(@Body() dto: CreateTechnologyDto) {
    return this.technologyService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all technologies' })
  @ApiResponse({
    status: 200,
    description: 'List of technologies',
    type: [TechnologyDto],
  })
  @ApiQuery({ name: 'category', required: false, example: 'Frontend' })
  async findAll() {
    return this.technologyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a technology by ID' })
  @ApiResponse({
    status: 200,
    description: 'Technology details',
    type: TechnologyDto,
  })
  @ApiResponse({ status: 404, description: 'Technology not found' })
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  async findOne(@Param('id') id: number) {
    return this.technologyService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update a technology' })
  @ApiResponse({
    status: 200,
    description: 'Technology updated successfully',
    type: TechnologyDto,
  })
  @ApiResponse({ status: 404, description: 'Technology not found' })
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  @ApiBody({ type: UpdateTechnologyDto })
  async update(@Param('id') id: number, @Body() dto: UpdateTechnologyDto) {
    return this.technologyService.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Delete a technology' })
  @ApiResponse({
    status: 200,
    description: 'Technology deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Technology not found' })
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  async remove(@Param('id') id: number) {
    return this.technologyService.remove(+id);
  }
}
