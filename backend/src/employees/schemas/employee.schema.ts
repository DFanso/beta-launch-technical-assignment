import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence';
import { EmployeeType } from '../../Types/employee.types';

export type EmployeeDocument = Employee & Document;

const AutoIncrement = AutoIncrementFactory(mongoose);

@Schema()
export class Employee {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true })
  employeeId: number;

  @Prop({ required: true })
  designation: string;

  @Prop({ required: true, enum: EmployeeType })
  employeeType: EmployeeType;

  @Prop({ required: true })
  experience: number;
}

const EmployeeSchema = SchemaFactory.createForClass(Employee);

// Apply auto-increment plugin to the schema
EmployeeSchema.plugin(AutoIncrement, { inc_field: 'employeeId' });

export { EmployeeSchema };
