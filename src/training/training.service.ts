import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TrainingDto } from './dto/training.dto';
import { UpdatedTrainingDto } from './dto/updatedTraining.dto';
import { Training, TrainingDocument } from './schema/training.schema';

@Injectable()
export class TrainingService {
  constructor(
    @InjectModel(Training.name) private trainingModel: Model<TrainingDocument>,
  ) {}

  async findTraining(id: string): Promise<Training> {
    return await this.trainingModel.findById(id);
  }

  async findAllTrainings(): Promise<Training[]> {
    return await this.trainingModel.find().exec();
  }

  async findUsersTrainings(userId): Promise<Training[]> {
    return await this.trainingModel.find({ user_id: userId }).exec();
  }

  async createTraining(trainingDto: TrainingDto): Promise<Training> {
    return await new this.trainingModel({ ...trainingDto }).save();
  }

  async updateTraining(
    id: string,
    updatedTrainingDto: UpdatedTrainingDto,
    user_id,
  ) {
    const updatedTraining = await this.trainingModel.findByIdAndUpdate(
      { _id: id },
      { ...updatedTrainingDto, user_id },
      { new: true },
    );

    if (!updatedTraining) {
      return new NotFoundException();
    }
    return updatedTraining;
  }

  async deleteTraining(id: string) {
    return await this.trainingModel.findByIdAndRemove(id);
  }
}
