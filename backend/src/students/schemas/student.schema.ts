import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ModelNames } from 'src/helper/model_names';

@Schema({ _id: false })
class EmergencyContact {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  phone: string;
}

@Schema({ timestamps: true, collection: ModelNames.STUDENTS })
export class Student extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, type: String })
  address: string;

  @Prop({ default: true, type: Boolean })
  is_active: boolean;

  @Prop({ required: true, type: String })
  country: string;

  @Prop({ required: true, type: String })
  city: string;

  @Prop({ required: true, type: String })
  state: string;

  @Prop({ required: true, type: String })
  phone: string;

  @Prop({ required: true, type: String })
  dob: string;

  @Prop({ required: true, type: EmergencyContact })
  emergency_contact: EmergencyContact;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'roles' })
  role: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    default: [],
  })
  courses: mongoose.Schema.Types.ObjectId[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
