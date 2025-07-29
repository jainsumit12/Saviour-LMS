import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Institute extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  logo: string;

  @Prop()
  address: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  website: string;

  @Prop()
  established: number;

  @Prop({ default: 'private' })
  type: string;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: 0 })
  numberOfStudents: number;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  country: string;

  @Prop()
  tagline: string;

  @Prop()
  facebook: string;

  @Prop()
  twitter: string;

  @Prop()
  instagram: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Course' }], default: [] })
  courses: Types.ObjectId[];
}

export const InstituteSchema = SchemaFactory.createForClass(Institute);
