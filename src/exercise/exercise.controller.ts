import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ExerciseDto } from './dto/exercise.dto';
import { ExerciseTrainingDto } from './dto/exerciseTraining.dto';
import { UpdatedExerciseTrainingDto } from './dto/updatedExercise.dto';
import { ExerciseService } from './exercise.service';

@Controller()
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get('/exercise/:id')
  async getExercise(@Param('id') id: string) {
    return await this.exerciseService.findExercise(id);
  }

  @Get('/exercises')
  async getAllUsers() {
    return await this.exerciseService.findAllExercises();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/exercise')
  async createExercise(@Body() exerciseDto: ExerciseDto, @Request() req) {
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    return await this.exerciseService.createExercise({
      ...exerciseDto,
      user_id: userId,
    });
  }
  @UseGuards(JwtAuthGuard)
  @Post('/exercise-training')
  async createExerciseTraining(
    @Body() exerciseTrainingDto: ExerciseTrainingDto,
    @Request() req,
  ) {
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    return await this.exerciseService.createExerciseForTraining({
      ...exerciseTrainingDto,
      user_id: userId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/exercise/:id')
  async updateTraining(
    @Param('id') id: string,
    @Body() updatedExerciseDto: UpdatedExerciseTrainingDto,
  ) {
    return await this.exerciseService.updateExercise(id, updatedExerciseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/exercise/remove/:id')
  async deleteTraining(@Param('id') id: string) {
    return await this.exerciseService.deleteExercise(id);
  }
}
