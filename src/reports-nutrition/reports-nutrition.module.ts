import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ReportsNutritionService } from './reports-nutrition.service';
import { ReportsNutritionController } from './reports-nutrition.controller';

import {
  ReportNutrition,
  ReportNutritionSchema,
} from './schemas/report-nutrition.schema';
import {
  DailyMacros,
  DailyMacrosSchema,
} from 'src/meals/schemas/dailyMacros.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ReportNutrition.name, schema: ReportNutritionSchema },
      { name: DailyMacros.name, schema: DailyMacrosSchema },
    ]),
  ],
  providers: [ReportsNutritionService],
  controllers: [ReportsNutritionController],
})
export class ReportsNutritionModule {}
