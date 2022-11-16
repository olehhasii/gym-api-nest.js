import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { User } from 'src/users/schemas/user.schema';

export type ExerciseTrainingDocument = HydratedDocument<ExerciseTraining>;

@Schema()
export class ExerciseTraining {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  equipment: string[];

  @Prop({ required: true })
  sets: number;

  @Prop({ required: true })
  reps: number;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  user_id: User;
}

export const ExerciseTrainingSchema =
  SchemaFactory.createForClass(ExerciseTraining);
