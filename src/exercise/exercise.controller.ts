import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ExerciseDto } from './dto/exercise.dto';
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
}
