import { UserParametersDto } from 'src/users/dto/userParameters.dto';

const RMR_FORMULA = {
  male: 5,
  female: -161,
};

const ACTIVITY_LEVEL = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  heavy: 1.725,
};

const GOAL = {
  lose: -500,
  gain: 500,
  maintain: 0,
};

export const rmrCalculation = (userParametersDto: UserParametersDto) => {
  const rmr =
    (10 * userParametersDto.weight +
      6.25 * userParametersDto.height -
      5 * userParametersDto.age +
      RMR_FORMULA[userParametersDto.gender as keyof typeof RMR_FORMULA]) *
      ACTIVITY_LEVEL[
        userParametersDto.activityLevel as keyof typeof ACTIVITY_LEVEL
      ] +
    GOAL[userParametersDto.goal as keyof typeof GOAL];

  return Math.round(rmr);
};
