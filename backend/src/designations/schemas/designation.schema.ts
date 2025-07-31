import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ModelNames } from 'src/helper/model_names';
@Schema({ timestamps: true, collection: ModelNames.DESIGNATIONS })
export class Designation extends Document {
  @Prop({ required: true, unique: true })
  title: string;
}

export const DesignationSchema = SchemaFactory.createForClass(Designation);
