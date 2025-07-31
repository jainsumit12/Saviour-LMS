import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ModelNames } from 'src/helper/model_names';

@Schema({ timestamps: true, collection: ModelNames.INSTITUTE_STAFFS })
export class InstituteStaff extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'institute_roles',
    required: true,
  })
  role: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'institutes',
    required: true,
  })
  institute: mongoose.Schema.Types.ObjectId;
}

export const InstituteStaffSchema =
  SchemaFactory.createForClass(InstituteStaff);

// ✅ Add this compound unique index
InstituteStaffSchema.index({ email: 1, institute: 1 }, { unique: true });
