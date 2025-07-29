import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Course extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop()
  level: string;

  @Prop()
  price: number;

  @Prop()
  instructor: string;

  @Prop()
  institute: string;

  @Prop({ default: 'active' })
  status: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
