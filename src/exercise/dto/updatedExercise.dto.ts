import mongoose from 'mongoose';

export class UpdatedExerciseTrainingDto {
  name?: string;
  description?: string;
  equipment?: string;
  sets?: number;
  reps?: number;
  user_id?: mongoose.Types.ObjectId;
}
