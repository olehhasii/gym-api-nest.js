export class ReportNutritionDto {
  timeLine: string;
  startDate: Date;
  endDate: Date;
  daysMacros: DailyMacrosForReportDto[];
  totalCalories: number;
  totalCarbs: number;
  totalProtein: number;
  totalFats: number;
}

export class CreateReportNutritionDto {
  timeLine: string;
  startDate: Date;
  endDate: Date;
}

export class DailyMacrosForReportDto {
  date: Date;
  caloriesConsumed: number;
  carbsConsumed: number;
  proteinConsumed: number;
  fatsConsumed: number;
}
