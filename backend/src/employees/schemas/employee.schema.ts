import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence';
import { EmployeeType } from '../../Types/employee.types';

export type EmployeeDocument = Employee & mongoose.Document;

const AutoIncrement = AutoIncrementFactory(mongoose);

@Schema()
export class Employee {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  initials: string;

  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({ required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })
  email: string;

  @Prop({ required: true, unique: true, match: /^\d{10}$/ })
  mobileNumber: string;

  @Prop({ unique: true })
  employeeId: number;

  @Prop({ required: true })
  designation: string;

  @Prop({ required: true, enum: EmployeeType })
  employeeType: EmployeeType;

  @Prop({ required: true })
  experience: number;

  @Prop({ required: true })
  joinedDate: Date;

  @Prop({ required: true })
  salary: number;

  @Prop()
  personalNotes: string;
}

const EmployeeSchema = SchemaFactory.createForClass(Employee);

// Apply auto-increment plugin to the schema
EmployeeSchema.plugin(AutoIncrement, { inc_field: 'employeeId' });

export { EmployeeSchema };
