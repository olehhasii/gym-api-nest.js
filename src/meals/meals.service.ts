import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';

import { Meal, MealDocument } from './schemas/meal.schema';
import { CreateMealDto, MealDto } from './dto/meal.dto';
import {
  calcTotalNutrientAmount,
  makeFoodObject,
} from 'src/helpers/meals.helpers';
import { DailyMacrosDto } from './dto/dailyMacros.dto';
import { DailyMacros, DailyMacrosDocument } from './schemas/dailyMacros.schema';

@Injectable()
export class MealsService {
  constructor(
    @InjectModel(Meal.name) private mealModel: Model<MealDocument>,
    @InjectModel(DailyMacros.name)
    private dailyMacrosModel: Model<DailyMacrosDocument>,
    private readonly httpService: HttpService,
  ) {}

  async findMeal(id: string): Promise<MealDto> {
    return await this.mealModel.findById(id);
  }

  async findUserMeals(userId): Promise<MealDto[]> {
    return await this.mealModel.find({ user_id: userId }).exec();
  }

  async createMeal(createMealDto: CreateMealDto, userId): Promise<MealDto> {
    const food = await makeFoodObject(createMealDto, this.httpService);
    const totalNutrient = calcTotalNutrientAmount(food);
    const meal = {
      name: createMealDto.name,
      food: food,
      ...totalNutrient,
    };
    return await new this.mealModel({ ...meal, user_id: userId }).save();
  }

  async createInitialDailyMacros(dailyMacrosDto: DailyMacrosDto, userId) {
    return await new this.dailyMacrosModel({
      ...dailyMacrosDto,
      user_id: userId,
    }).save();
  }

  async getDailyMacrosByDate(date: Date, user_id) {
    return await this.dailyMacrosModel.findOne({
      date: date,
      user_id,
    });
  }
}
