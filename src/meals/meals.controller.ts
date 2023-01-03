import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { MealsService } from './meals.service';
import { CreateMealDto } from './dto/meal.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import mongoose from 'mongoose';
import { DailyMacrosDto } from './dto/dailyMacros.dto';

@Controller('meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async getUserMeals(@Request() req) {
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    return await this.mealsService.findUserMeals(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getMeal(@Param('id') id: string) {
    return await this.mealsService.findMeal(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/new')
  async createMeal(@Body() createMealDto: CreateMealDto, @Request() req) {
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    return await this.mealsService.createMeal(createMealDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/initial')
  async createInitialDailyMacros(
    @Body() dailyMacrosDto: DailyMacrosDto,
    @Request() req,
  ) {
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    return await this.mealsService.createInitialDailyMacros(
      dailyMacrosDto,
      userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get/:date')
  async getDailyMacros(@Param('date') date: Date, @Request() req) {
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    return await this.mealsService.getDailyMacrosByDate(date, userId);
  }
}
