import {
  Controller,
  Post,
  UseGuards,
  Body,
  Request,
  Patch,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TrainingDto } from './dto/training.dto';
import { UpdatedTrainingDto } from './dto/updatedTraining.dto';
import { TrainingService } from './training.service';

@Controller('training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/training/:id')
  async getTraining(@Param('id') id: string) {
    return await this.trainingService.findTraining(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/mytrainings')
  async getUsersTrainings() {
    console.log('no');
    return await this.trainingService.findAllTrainings();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/new')
  async createTraining(@Body() trainingDto: TrainingDto, @Request() req) {
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    const exerciseIds = trainingDto.exercises.map(
      (id) => new mongoose.Types.ObjectId(id),
    );
    return await this.trainingService.createTraining({
      ...trainingDto,
      exercises: exerciseIds,
      user_id: userId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateTraining(
    @Param('id') id: string,
    @Body() updatedTrainingDto: UpdatedTrainingDto,
  ) {
    return await this.trainingService.updateTraining(id, updatedTrainingDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/remove/:id')
  async deleteTraining(@Param('id') id: string) {
    return await this.trainingService.deleteTraining(id);
  }
}
