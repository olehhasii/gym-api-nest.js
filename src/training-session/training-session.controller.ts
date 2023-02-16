import {
  Body,
  Controller,
  Put,
  Request,
  UseGuards,
  Get,
  Patch,
  Post,
  Param,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TrainingLogDto } from './dto/training-log.dto';
import {
  SessionExerciseDto,
  TrainingSessionDto,
} from './dto/training-session.dto';
import { TrainingSessionService } from './training-session.service';

@Controller('training-session')
export class TrainingSessionController {
  constructor(
    private readonly trainingSessionService: TrainingSessionService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Put('/init')
  async postTraininingSession(
    @Request() req,
    @Body() trainingSessionDto: TrainingSessionDto,
  ) {
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    return await this.trainingSessionService.postTraininingSession(
      trainingSessionDto,
      userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get-session')
  async getUserCurrentTrainingSession(@Request() req) {
    return await this.trainingSessionService.getTrainingSession(
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/set-active-exercise')
  async updateActiveExercise(
    @Request() req,
    @Body()
    activeExercise: SessionExerciseDto,
  ) {
    return await this.trainingSessionService.updateActiveExercise(
      activeExercise,
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/finish-exercise')
  async saveFinishedExercise(
    @Request() req,
    @Body() finishedExercise: SessionExerciseDto,
  ) {
    return await this.trainingSessionService.postFinishedExercise(
      finishedExercise,
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('/save-training-log')
  async saveFinishedTraining(
    @Request() req,
    @Body() trainingLog: TrainingLogDto,
  ) {
    return await this.trainingSessionService.postTrainingLog(
      trainingLog,
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/logs')
  async getUserTrainingHistory(@Request() req) {
    return await this.trainingSessionService.getAllTrainingLogs(
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/log/:id')
  async getTrainingLog(@Param('id') id: string) {
    return await this.trainingSessionService.getTrainingLog(id);
  }
}
