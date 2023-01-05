import { MealDto } from './meal.dto';

export class MealsDto {
  breakfast: MealDto;
  lunch: MealDto;
  dinner: MealDto;
  snacks: MealDto;
}

export class DailyMacrosDto {
  date: Date;
  caloriesConsumed: number;
  carbsConsumed: number;
  proteinConsumed: number;
  fatsConsumed: number;
  meals: MealsDto;
}

export class FoodDto {
  name: string;
  weight: number;
}

export class AddProductsToMealDto {
  date: Date;
  name: string;
  food: FoodDto[];
}
