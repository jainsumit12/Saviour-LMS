import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { ModelNames } from 'src/helper/model_names';

@Schema({ timestamps: true, collection: ModelNames.PARTNERS })
export class Partner extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'roles' })
  role: mongoose.Schema.Types.ObjectId;
}

export const PartnerSchema = SchemaFactory.createForClass(Partner);
