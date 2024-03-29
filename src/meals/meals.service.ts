import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';

import { Meal, MealDocument } from './schemas/meal.schema';
import { MealDto } from './dto/meal.dto';
import {
  calcTotalNutrientAmount,
  makeFoodObject,
} from 'src/helpers/meals.helpers';
import {
  AddProductsToMealDto,
  DailyMacrosDto,
  MealsDto,
} from './dto/dailyMacros.dto';
import { DailyMacros, DailyMacrosDocument } from './schemas/dailyMacros.schema';
import { roundTo1Decimal } from 'src/helpers/math';

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

  async addProductsToMeal(addProductsToMealDto: AddProductsToMealDto, user_id) {
    const mealName = addProductsToMealDto.name;

    const dailyMacros = await this.dailyMacrosModel.findOne({
      user_id,
      date: addProductsToMealDto.date,
    });

    const foodMacros = await makeFoodObject(
      addProductsToMealDto.food,
      this.httpService,
    );

    const foodDaily = [...dailyMacros.meals[mealName].food, ...foodMacros];

    const totalNutrients = calcTotalNutrientAmount(foodDaily);

    const meal = {
      name: mealName,
      food: foodDaily,
      ...totalNutrients,
    };

    const calculateDailyNutrientsConsumed = (meals: MealsDto, nutrientName) => {
      return roundTo1Decimal(
        Object.values(meals).reduce((sum, meal) => sum + meal[nutrientName], 0),
      );
    };

    dailyMacros.meals[mealName] = meal;
    dailyMacros.caloriesConsumed = calculateDailyNutrientsConsumed(
      dailyMacros.meals,
      'totalCalories',
    );
    dailyMacros.carbsConsumed = calculateDailyNutrientsConsumed(
      dailyMacros.meals,
      'totalCarbs',
    );
    dailyMacros.proteinConsumed = calculateDailyNutrientsConsumed(
      dailyMacros.meals,
      'totalProtein',
    );
    dailyMacros.fatsConsumed = calculateDailyNutrientsConsumed(
      dailyMacros.meals,
      'totalFats',
    );

    return await this.dailyMacrosModel.findOneAndUpdate(
      {
        user_id,
        date: addProductsToMealDto.date,
      },
      dailyMacros,
      { new: true },
    );
  }
}
