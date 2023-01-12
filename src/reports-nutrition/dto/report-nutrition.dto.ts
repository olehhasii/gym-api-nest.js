import { DailyMacrosDto } from 'src/meals/dto/dailyMacros.dto';

export class ReportNutritionDto {
  timeLine: string;
  startDate: Date;
  endDate: Date;
  daysMacros: DailyMacrosDto[];
  totalCalories: number;
  totalCarbs: number;
  totalProtein: number;
  totalFat: number;
}

export class CreateReportNutritionDto {
  timeLine: string;
  startDate: Date;
  endDate: Date;
}
