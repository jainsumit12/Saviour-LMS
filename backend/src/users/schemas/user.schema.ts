import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { ModelNames } from 'src/helper/model_names';

@Schema({ timestamps: true, collection: ModelNames.USERS })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'roles',
    required: true,
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
