import mongoose from 'mongoose';

export class ExerciseDto {
  exerciseName: string;
  description?: string;
  sets: number;
  reps: number;
  weight: number;
}

export class TrainingDto {
  workoutName: string;
  exercises: ExerciseDto[];
  muscleGroups?: string[];
  daysOfWorkout?: string[];
  user_id?: mongoose.Types.ObjectId;
}
