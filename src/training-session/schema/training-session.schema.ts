import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { User } from 'src/users/schemas/user.schema';
import { Training } from 'src/training/schema/training.schema';
import { SessionExerciseDto } from '../dto/training-session.dto';

export type TrainingSessionDocument = HydratedDocument<TrainingSession>;

@Schema()
export class TrainingSession {
  @Prop()
  workoutName: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Training' })
  workoutId: Training;

  @Prop({ required: false })
  muscleGroups: string[];

  @Prop({ required: false })
  daysOfWorkout: string[];

  @Prop()
  exercises: SessionExerciseDto[];

  @Prop()
  timeWorkoutWasStarted: Date;

  @Prop()
  activeExercise: SessionExerciseDto;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  user_id: User;
}

export const TrainingSessionSchema =
  SchemaFactory.createForClass(TrainingSession);
