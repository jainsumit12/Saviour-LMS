import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class RoleOptions extends Document {
  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  name: string;
}

export const RoleOptionsSchema = SchemaFactory.createForClass(RoleOptions);
