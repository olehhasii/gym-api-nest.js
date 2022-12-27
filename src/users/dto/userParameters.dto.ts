class UserMacrosDto {
  caloriesPerDay: number;
  carbs: number;
  protein: number;
  fats: number;
}

export class UserParametersDto {
  age: number;
  weight: number;
  height: number;
  gender: string;
  activityLevel: string;
  goal: string;
  macros?: UserMacrosDto;
}
