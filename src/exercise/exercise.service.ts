import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExerciseDto } from './dto/exercise.dto';
import { Exercise, ExerciseDocument } from './schemas/exercise.chema';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectModel(Exercise.name) private exerciseModel: Model<ExerciseDocument>,
  ) {}

  async findExercise(id: string): Promise<Exercise> {
    return await this.exerciseModel.findById(id);
  }

  async findAllExercises(): Promise<Exercise[]> {
    return await this.exerciseModel.find().exec();
  }

  async createExercise(exerciseDto: ExerciseDto): Promise<Exercise> {
    return await new this.exerciseModel({
      ...exerciseDto,
    }).save();
  }
}
