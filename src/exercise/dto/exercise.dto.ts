import mongoose from 'mongoose';

export class ExerciseDto {
  name: string;
  description: string;
  equipment?: string;
  user_id?: mongoose.Types.ObjectId;
}
