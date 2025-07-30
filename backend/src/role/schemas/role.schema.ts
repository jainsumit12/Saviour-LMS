import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Role extends Document {
  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  name: string;

  @Prop({
    type: [Types.ObjectId],
    ref: 'roleoptions',
    default: [],
  })
  options: Types.ObjectId[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
