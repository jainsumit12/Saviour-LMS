import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);
@Schema({ timestamps: true })
export class Role extends Document {
  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  name: string;

  @Prop({ type: String, slug: 'name' })
  value: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'roleoptions',
    default: [],
  })
  options: mongoose.Schema.Types.ObjectId[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
