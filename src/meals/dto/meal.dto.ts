export class FoodDto {
  name: string;
  weight?: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export class CreateFoodDto {
  name: string;
  weight?: string;
}

export class MealDto {
  name: string;
  food: FoodDto[];
  totalCalories: number;
  totalProtein: number;
  totalFat: number;
  totalCarbs: number;
}

export class CreateMealDto {
  name: string;
  food: CreateFoodDto[];
}
