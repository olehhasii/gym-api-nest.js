import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExerciseDto } from './dto/exercise.dto';
import { ExerciseTrainingDto } from './dto/exerciseTraining.dto';
import { UpdatedExerciseTrainingDto } from './dto/updatedExercise.dto';
import { Exercise, ExerciseDocument } from './schemas/exercise.schema';
import {
  ExerciseTraining,
  ExerciseTrainingDocument,
} from './schemas/exerciseTraining.schema';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectModel(Exercise.name) private exerciseModel: Model<ExerciseDocument>,
    @InjectModel(ExerciseTraining.name)
    private exerciseTrainingModel: Model<ExerciseTrainingDocument>,
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

  async findExerciseTraining(id: string): Promise<ExerciseTraining> {
    return await this.exerciseTrainingModel.findById(id);
  }

  async createExerciseForTraining(
    exerciseTrainingDto: ExerciseTrainingDto,
  ): Promise<ExerciseTraining> {
    return await new this.exerciseTrainingModel({
      ...exerciseTrainingDto,
    }).save();
  }

  async updateExercise(
    id: string,
    updatedExerciseDto: UpdatedExerciseTrainingDto,
  ) {
    const updatedExercise = await this.exerciseTrainingModel.findByIdAndUpdate(
      { _id: id },
      updatedExerciseDto,
      { new: true },
    );

    if (!updatedExercise) {
      return new NotFoundException();
    }
    return updatedExercise;
  }

  async deleteExercise(id: string) {
    return await this.exerciseTrainingModel.findByIdAndRemove(id);
  }
}
