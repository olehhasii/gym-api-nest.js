import mongoose from 'mongoose';

export class ExerciseTrainingDto {
  name: string;
  description: string;
  equipment?: string;
  sets: number;
  reps: number;
  user_id?: mongoose.Types.ObjectId;
}
