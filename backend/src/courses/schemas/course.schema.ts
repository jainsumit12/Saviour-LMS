import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

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
  currency: string;

  @Prop()
  duration: string;

  @Prop({ default: 0 })
  enrollments: number;

  @Prop({ default: 0 })
  rating: number;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  maxStudents: number;

  @Prop({ type: [String] })
  tags: string[];

  @Prop()
  completionRate: number;

  @Prop()
  totalRevenue: number;

  @Prop()
  language: string;

  @Prop()
  instructor: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Institute' })
  institute: mongoose.Schema.Types.ObjectId;

  @Prop({ default: 'active' })
  status: string;

  @Prop()
  thumbnail: string;

  @Prop()
  videoUrl: string;

  @Prop({ type: [String] })
  requirements: string[];

  @Prop({ type: [String] })
  objectives: string[];

  @Prop({ type: [String] })
  prerequisites: string[];

  @Prop({ default: false })
  certificate: boolean;

  @Prop()
  credits: number;

  @Prop({ default: false })
  featured: boolean;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
