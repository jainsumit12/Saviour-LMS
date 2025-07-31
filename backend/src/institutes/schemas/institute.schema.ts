import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { ModelNames } from 'src/helper/model_names';

@Schema({ timestamps: true, collection: ModelNames.INSTITUTES })
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

  @Prop({ required: true })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  role: mongoose.Schema.Types.ObjectId;

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

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    default: [],
  })
  courses: mongoose.Schema.Types.ObjectId[];
}

export const InstituteSchema = SchemaFactory.createForClass(Institute);
