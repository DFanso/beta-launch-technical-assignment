import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  IsDateString,
  IsEmail,
  Matches,
} from 'class-validator';
import { EmployeeType } from '../../Types/employee.types';

export class CreateEmployeeDto {
  @ApiProperty({
    description: 'The full name of the employee',
    maxLength: 100,
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  fullName: string;

  @ApiProperty({
    description: 'Name with initials',
    maxLength: 20,
    example: 'J.D.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  initials: string;

  @ApiProperty({
    description: 'Preferred / Display name',
    maxLength: 50,
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  displayName: string;

  @ApiProperty({
    description: 'Gender of the employee',
    example: 'Male',
  })
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty({
    description: 'Date of birth',
    example: '1990-01-01',
  })
  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: string;

  @ApiProperty({
    description: 'Email of the employee',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Mobile number of the employee',
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{10}$/, {
    message: 'Mobile number must be a valid 10 digit number',
  })
  mobileNumber: string;

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
    description: 'The years of experience the employee has',
    example: 3,
  })
  @IsNumber()
  @IsNotEmpty()
  experience: number;

  @ApiProperty({
    description: 'The date the employee joined',
    example: '2020-02-10',
  })
  @IsDateString()
  @IsNotEmpty()
  joinedDate: string;

  @ApiProperty({
    description: 'The salary of the employee',
    example: 450000,
  })
  @IsNumber()
  @IsNotEmpty()
  salary: number;

  @ApiProperty({
    description: 'Personal notes about the employee',
    example: 'Lorem ipsum dolor sit amet consectetur.',
  })
  @IsString()
  @IsOptional()
  personalNotes: string;
}
