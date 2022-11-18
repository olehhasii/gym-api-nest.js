import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MealsService } from './meals.service';

import { CreateMealDto } from './dto/meal.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import mongoose from 'mongoose';

@Controller('meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/new')
  async createMeal(@Body() createMealDto: CreateMealDto, @Request() req) {
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    return await this.mealsService.createMeal(createMealDto, userId);
  }
}
