import { FoodDto } from 'src/meals/dto/dailyMacros.dto';
import { roundTo1Decimal } from './math';

const getNutrient = (nutrientName, foodArray) => {
  return foodArray.foodNutrients.find(
    (obj) => obj.nutrientName === nutrientName,
  ).value;
};

export const findFoodNutrion = async (
  foodName: string,
  weight,
  httpService,
) => {
  const params = {
    api_key: 'hk0OfoSDAR8pghgodZN29ZUpjSXF07TMeZAihY8c',
    pagesize: 5,
  };
  const apiUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodName}%20cheese&dataType=Survey%20%28FNDDS%29&pageSize=${params.pagesize}&pageNumber=1&sortBy=dataType.keyword&sortOrder=asc&api_key=${params.api_key}`;

  const response = await httpService.get(apiUrl).toPromise();
  const food = response.data.foods[1];

  const foodObject = {
    name: foodName,
    calories: roundTo1Decimal((getNutrient('Energy', food) / 100) * weight),
    protein: roundTo1Decimal((getNutrient('Protein', food) / 100) * weight),
    fat: roundTo1Decimal(
      (getNutrient('Total lipid (fat)', food) / 100) * weight,
    ),
    carbs: roundTo1Decimal(
      (getNutrient('Carbohydrate, by difference', food) / 100) * weight,
    ),
  };

  return foodObject;
};

export const makeFoodObject = async (food: FoodDto[], httpService) => {
  const foodResult = await Promise.all(
    food.map(async (food) => {
      const result = await findFoodNutrion(food.name, food.weight, httpService);
      return { ...result, weight: food.weight };
    }),
  );
  return foodResult;
};

export const calcTotalNutrientAmount = (food) => {
  const totalCalories = food.reduce((a, b) => {
    return a + b['calories'];
  }, 0);
  const totalProtein = food.reduce((a, b) => {
    return a + b['protein'];
  }, 0);
  const totalFats = food.reduce((a, b) => {
    return a + b['fat'];
  }, 0);
  const totalCarbs = food.reduce((a, b) => {
    return a + b['carbs'];
  }, 0);

  const result = {
    /* totalCalories: Math.round(totalCalories * 100) / 100,
    totalProtein: Math.round(totalProtein * 100) / 100,
    totalFats: Math.round(totalFats * 100) / 100,
    totalCarbs: Math.round(totalCarbs * 100) / 100, */
    totalCalories: roundTo1Decimal(totalCalories),
    totalProtein: roundTo1Decimal(totalProtein),
    totalFats: roundTo1Decimal(totalFats),
    totalCarbs: roundTo1Decimal(totalCarbs),
  };
  return result;
};
