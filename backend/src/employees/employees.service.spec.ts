import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from './employees.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from './schemas/employee.schema';
import { NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeType } from '../Types/employee.types';

const mockEmployee = (
  fullName = 'John Doe',
  designation = 'Senior Developer',
  employeeType = EmployeeType.CONTRACT,
  experience = 2,
  employeeId = 1,
): Partial<Employee> => ({
  fullName,
  designation,
  employeeType,
  experience,
  employeeId,
});

const mockEmployeeModel = {
  create: jest.fn(),
  find: jest.fn().mockReturnThis(),
  findOne: jest.fn().mockReturnThis(),
  findOneAndUpdate: jest.fn().mockReturnThis(),
  deleteOne: jest.fn().mockReturnThis(),
  countDocuments: jest.fn(),
  sort: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  exec: jest.fn(),
};

describe('EmployeesService', () => {
  let service: EmployeesService;
  let model: Model<Employee>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        {
          provide: getModelToken(Employee.name),
          useValue: mockEmployeeModel,
        },
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
    model = module.get<Model<Employee>>(getModelToken(Employee.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new employee', async () => {
      const createEmployeeDto: CreateEmployeeDto = {
        fullName: 'John Doe',
        designation: 'Senior Developer',
        employeeType: EmployeeType.CONTRACT,
        experience: 2,
        employeeId: 1,
        initials: '',
        displayName: '',
        gender: '',
        dateOfBirth: undefined,
        email: '',
        mobileNumber: '',
        joinedDate: undefined,
        salary: 0,
        personalNotes: '',
      };
      const createdEmployee = {
        ...createEmployeeDto,
        _id: 'someId',
        __v: 0,
      };
      jest.spyOn(model, 'create').mockResolvedValueOnce(createdEmployee as any);
      const result = await service.create(createEmployeeDto);
      expect(result).toMatchObject(createEmployeeDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of employees', async () => {
      const employees = [mockEmployee()];
      jest.spyOn(model, 'find').mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValueOnce(employees),
      } as any);
      jest.spyOn(model, 'countDocuments').mockResolvedValueOnce(1);
      const result = await service.findAll();
      expect(result.employees).toEqual(employees);
      expect(result.totalPages).toBe(1);
    });
  });

  describe('findOne', () => {
    it('should find and return an employee by id', async () => {
      const employee = mockEmployee();
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(employee),
      } as any);
      expect(await service.findOne({ employeeId: 1 })).toEqual(employee);
    });

    it('should throw an error if employee not found', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);
      await expect(service.findOne({ employeeId: 2 })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update and return the employee', async () => {
      const updateEmployeeDto = { designation: 'Lead Developer' };
      const updatedEmployee = { ...mockEmployee(), ...updateEmployeeDto };
      jest.spyOn(model, 'findOneAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(updatedEmployee),
      } as any);
      expect(await service.update(1, updateEmployeeDto)).toEqual(
        updatedEmployee,
      );
    });

    it('should throw an error if employee not found', async () => {
      jest.spyOn(model, 'findOneAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);
      await expect(
        service.update(1, { designation: 'Lead Developer' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove the employee', async () => {
      jest.spyOn(model, 'deleteOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce({ deletedCount: 1 }),
      } as any);
      await expect(service.remove(1)).resolves.toBeUndefined();
    });

    it('should throw an error if employee not found', async () => {
      jest.spyOn(model, 'deleteOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce({ deletedCount: 0 }),
      } as any);
      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
