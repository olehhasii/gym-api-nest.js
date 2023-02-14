import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TrainingLogDto } from './dto/training-log.dto';
import { TrainingSessionDto } from './dto/training-session.dto';
import { TrainingLog, TrainingLogDocument } from './schema/training-log.schema';
import {
  TrainingSession,
  TrainingSessionDocument,
} from './schema/training-session.schema';

@Injectable()
export class TrainingSessionService {
  constructor(
    @InjectModel(TrainingSession.name)
    private readonly trainingSessionModel: Model<TrainingSessionDocument>,
    @InjectModel(TrainingLog.name)
    private readonly trainingLogModel: Model<TrainingLogDocument>,
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

  async getTrainingSession(user_id): Promise<TrainingSession> {
    return await this.trainingSessionModel.findOne({ user_id });
  }

  async updateActiveExercise(
    activeExercise,
    user_id,
  ): Promise<TrainingSession> {
    return await this.trainingSessionModel.findOneAndUpdate(
      user_id,
      activeExercise,
      { new: true },
    );
  }

  async postFinishedExercise(
    finishedExercise,
    user_id,
  ): Promise<TrainingSession> {
    const query = {
      user_id,
      'exercises.exerciseName': finishedExercise.exerciseName,
    };
    const newData = {
      $set: {
        activeExercise: null,
        'exercises.$.setsDone': finishedExercise.setsDone,
        'exercises.$.done': finishedExercise.done,
      },
    };

    return await this.trainingSessionModel.findOneAndUpdate(query, newData, {
      new: true,
    });
  }

  async postTrainingLog(
    trainingLog: TrainingLogDto,
    user_id,
  ): Promise<TrainingLog> {
    await this.trainingSessionModel.findOneAndDelete(user_id);
    return await new this.trainingLogModel(trainingLog).save();
  }
}
