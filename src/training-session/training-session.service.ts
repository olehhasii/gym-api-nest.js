import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TrainingSessionDto } from './dto/training-session.dto';
import {
  TrainingSession,
  TrainingSessionDocument,
} from './schema/training-session.schema';

@Injectable()
export class TrainingSessionService {
  constructor(
    @InjectModel(TrainingSession.name)
    private readonly trainingSessionModel: Model<TrainingSessionDocument>,
  ) {}

  async postTraininingSession(
    trainingSessionDto: TrainingSessionDto,
    user_id,
  ): Promise<TrainingSession> {
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    return await this.trainingSessionModel.findOneAndUpdate(
      { user_id },
      trainingSessionDto,
      options,
    );
  }

  async getTrainingSession(user_id) {
    return await this.trainingSessionModel.findOne({ user_id });
  }
}
