import mongoose from 'mongoose';

export class UpdatedTrainingDto {
  name?: string;
  exercises?: mongoose.Types.ObjectId[];
  muscles?: string[];
  days?: string[];
  user_id?: mongoose.Types.ObjectId;
}
