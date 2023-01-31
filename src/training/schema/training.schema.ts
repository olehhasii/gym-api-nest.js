import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { User } from 'src/users/schemas/user.schema';
import { ExerciseDto } from '../dto/training.dto';

export type TrainingDocument = HydratedDocument<Training>;

@Schema()
export class Training {
  @Prop({ required: true })
  workoutName: string;

  @Prop({ required: true })
  exercises: ExerciseDto[];

  @Prop({ required: false })
  muscleGroups: string[];

  @Prop({ required: false })
  daysOfWorkout: string[];

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  user_id: User;
}

export const TrainingSchema = SchemaFactory.createForClass(Training);
