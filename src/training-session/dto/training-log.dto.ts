import mongoose from 'mongoose';

import { SessionExerciseDto } from './training-session.dto';

export class TrainingLogDto {
  workoutName: string;
  workoutId: mongoose.Types.ObjectId;
  muscleGroups?: string[];
  daysOfWorkout?: string[];
  exercises: SessionExerciseDto[];
  timeWorkoutWasStarted: Date;
  timeWorkoutFinished: Date;
  user_id?: mongoose.Types.ObjectId;
}
