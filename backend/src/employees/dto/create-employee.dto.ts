import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { EmployeeType } from '../../Types/employee.types';

export class CreateEmployeeDto {
  @ApiProperty({
    description: 'The name of the employee',
    maxLength: 100,
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsNumber()
  @IsOptional()
  employeeId: number;

  @ApiProperty({
    description: 'The designation of the employee',
    maxLength: 50,
    example: 'Senior Developer',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  designation: string;

  @ApiProperty({
    description: 'The type of employment',
    enum: EmployeeType,
  })
  @IsEnum(EmployeeType)
  @IsNotEmpty()
  employeeType: EmployeeType;

  @ApiProperty({
    description: 'The years of experience the employee has ',
    example: '2',
  })
  @IsNumber()
  @IsNotEmpty()
  experience: number;
}
