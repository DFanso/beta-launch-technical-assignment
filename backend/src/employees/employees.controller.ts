import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Employee } from './schemas/employee.schema';

@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @ApiOperation({ summary: 'Create an employee' })
  @ApiResponse({
    status: 201,
    description: 'The employee has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all employees' })
  @ApiResponse({
    status: 200,
    description: 'List of employees',
    type: [Employee],
  })
  @ApiQuery({
    name: 'type',
    required: false,
    description: 'Filter by employee type',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page',
    type: Number,
  })
  findAll(
    @Query('type') type?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 5,
  ) {
    return this.employeesService.findAll(type, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single employee' })
  @ApiResponse({
    status: 200,
    description: 'The found employee',
    type: Employee,
  })
  @ApiResponse({ status: 404, description: 'Employee not found.' })
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an employee' })
  @ApiResponse({
    status: 200,
    description: 'The employee has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Employee not found.' })
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an employee' })
  @ApiResponse({
    status: 200,
    description: 'The employee has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Employee not found.' })
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
