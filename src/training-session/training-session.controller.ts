import { Body, Controller, Put, Request, UseGuards, Get } from '@nestjs/common';
import mongoose from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TrainingSessionDto } from './dto/training-session.dto';
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
}
