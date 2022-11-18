import { CreateMealDto } from 'src/meals/dto/meal.dto';

const getNutrient = (nutrientName, foodArray) => {
  return foodArray.foodNutrients.find(
    (obj) => obj.nutrientName === nutrientName,
  ).value;
};

export const findFoodNutrion = async (foodName: string, httpService) => {
  const params = {
    api_key: 'hk0OfoSDAR8pghgodZN29ZUpjSXF07TMeZAihY8c',
    pagesize: 5,
  };
  const apiUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodName}%20cheese&dataType=Survey%20%28FNDDS%29&pageSize=${params.pagesize}&pageNumber=1&sortBy=dataType.keyword&sortOrder=asc&api_key=${params.api_key}`;

  const response = await httpService.get(apiUrl).toPromise();
  const food = response.data.foods[1];

  const foodObject = {
    name: foodName,
    calories: getNutrient('Energy', food),
    protein: getNutrient('Protein', food),
    fat: getNutrient('Total lipid (fat)', food),
    carbs: getNutrient('Carbohydrate, by difference', food),
  };

  return foodObject;
};

export const makeFoodObject = async (meal: CreateMealDto, httpService) => {
  const food = meal.food;
  const foodResult = await Promise.all(
    food.map(async (food) => {
      const result = await findFoodNutrion(food.name, httpService);
      return result;
    }),
  );

  return foodResult;
};

export const calcTotalNutrientAmount = (food) => {
  const totalCalories = food.reduce((a, b) => {
    return a['calories'] + b['calories'];
  });
  const totalProtein = food.reduce((a, b) => {
    return a['protein'] + b['protein'];
  });
  const totalFat = food.reduce((a, b) => {
    return a['fat'] + b['fat'];
  });
  const totalCarbs = food.reduce((a, b) => {
    return a['carbs'] + b['carbs'];
  });

  const result = {
    totalCalories: Math.round(totalCalories * 100) / 100,
    totalProtein: Math.round(totalProtein * 100) / 100,
    totalFat: Math.round(totalFat * 100) / 100,
    totalCarbs: Math.round(totalCarbs * 100) / 100,
  };
  return result;
};
