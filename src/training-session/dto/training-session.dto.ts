import mongoose from 'mongoose';

export class SetsDoneDto {
  reps: number;
  weight?: number;
}

export class SessionExerciseDto {
  exerciseName: string;
  sets: number;
  reps: number;
  weight?: number;
  setsDone?: SetsDoneDto[];
  done?: boolean;
  exerciseDescription?: string;
}

export class TrainingSessionDto {
  workoutName: string;
  workoutId: mongoose.Types.ObjectId;
  muscleGroups?: string[];
  daysOfWorkout?: string[];
  exercises: SessionExerciseDto[];
  timeWorkoutWasStarted: Date;
  timeWorkoutFinished: Date;
  activeExercise: SessionExerciseDto;
  user_id?: mongoose.Types.ObjectId;
}
