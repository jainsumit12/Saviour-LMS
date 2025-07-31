import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ModelNames } from 'src/helper/model_names';
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);
@Schema({ timestamps: true, collection: ModelNames.INSTITUTE_ROLE_OPTIONS })
export class InstituteRoleOptions extends Document {
  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  name: string;

  @Prop({ type: String, slug: 'name' })
  value: string;
}

export const InstituteRoleOptionsSchema = SchemaFactory.createForClass(InstituteRoleOptions);
