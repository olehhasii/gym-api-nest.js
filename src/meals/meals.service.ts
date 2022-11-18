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

@Injectable()
export class MealsService {
  constructor(
    @InjectModel(Meal.name) private mealModel: Model<MealDocument>,
    private readonly httpService: HttpService,
  ) {}

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
}
