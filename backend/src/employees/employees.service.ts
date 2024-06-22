import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from './schemas/employee.schema';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const createdEmployee = await this.employeeModel.create(createEmployeeDto);
    return createdEmployee;
  }

  async findAll(type?: string, page = 1, limit = 5): Promise<Employee[]> {
    const filter = type ? { employeeType: type } : {};
    return this.employeeModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeModel
      .findOne({ employeeId: id })
      .exec();
    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    return employee;
  }

  async update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    const existingEmployee = await this.employeeModel
      .findOneAndUpdate(
        { employeeId: id },
        { $set: updateEmployeeDto },
        { new: true },
      )
      .exec();

    if (!existingEmployee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    return existingEmployee;
  }

  async remove(id: number): Promise<void> {
    const result = await this.employeeModel
      .deleteOne({ employeeId: id })
      .exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
  }
}