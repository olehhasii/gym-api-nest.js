import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { User } from 'src/users/schemas/user.schema';

export type TrainingDocument = HydratedDocument<Training>;

@Schema()
export class Training {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'Exercise' })
  exercises: mongoose.Types.ObjectId[];

  @Prop({ required: false })
  muscles: string[];

  @Prop({ required: false })
  days: string[];

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  user_id: User;
}

export const TrainingSchema = SchemaFactory.createForClass(Training);
