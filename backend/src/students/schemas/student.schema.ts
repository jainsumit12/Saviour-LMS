import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { ModelNames } from 'src/helper/model_names';

@Schema({ timestamps: true, collection: ModelNames.STUDENTS })
export class Student extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'roles' })
  role: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    default: [],
  })
  courses: mongoose.Schema.Types.ObjectId[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
