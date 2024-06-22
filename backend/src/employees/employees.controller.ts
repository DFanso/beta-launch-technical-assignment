import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Employee } from './schemas/employee.schema';

@ApiTags('employees')
@Controller({ path: 'employees', version: '1' })
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @ApiOperation({ summary: 'Create an employee' })
  @ApiResponse({
    status: 201,
    description: 'The employee has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    try {
      const { email, mobileNumber } = createEmployeeDto;

      if (!email || !mobileNumber) {
        throw new HttpException(
          'Email and mobile number are required',
          HttpStatus.BAD_REQUEST,
        );
      }
      let employee;
      employee = await this.employeesService.findOne({ email: email });

      if (employee) {
        throw new HttpException(
          'Email is already in use!',
          HttpStatus.BAD_REQUEST,
        );
      }

      employee = await this.employeesService.findOne({
        mobileNumber: mobileNumber,
      });

      if (employee) {
        throw new HttpException(
          'Mobile Number is already in use!',
          HttpStatus.BAD_REQUEST,
        );
      }

      const createdEmployee =
        await this.employeesService.create(createEmployeeDto);
      return createdEmployee;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error creating employee',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
  async findAll(
    @Query('type') type?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 5,
  ) {
    try {
      const employees = await this.employeesService.findAll(type, page, limit);
      return employees;
    } catch (error) {
      throw new HttpException(
        'Error fetching employees',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single employee' })
  @ApiResponse({
    status: 200,
    description: 'The found employee',
    type: Employee,
  })
  @ApiResponse({ status: 404, description: 'Employee not found.' })
  async findOne(@Param('id') id: string) {
    try {
      const employee = await this.employeesService.findOne(+id);
      if (!employee) {
        throw new HttpException(
          `Employee with id ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return employee;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error fetching employee',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an employee' })
  @ApiResponse({
    status: 200,
    description: 'The employee has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Employee not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    try {
      const updatedEmployee = await this.employeesService.update(
        +id,
        updateEmployeeDto,
      );
      if (!updatedEmployee) {
        throw new HttpException(
          `Employee with id ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return updatedEmployee;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error updating employee',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an employee' })
  @ApiResponse({
    status: 200,
    description: 'The employee has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Employee not found.' })
  async remove(@Param('id') id: string) {
    try {
      await this.employeesService.remove(+id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error deleting employee',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
