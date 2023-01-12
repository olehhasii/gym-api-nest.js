import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ReportsNutritionService } from './reports-nutrition.service';
import { ReportsNutritionController } from './reports-nutrition.controller';

import {
  ReportNutrition,
  ReportNutritionSchema,
} from './schemas/report-nutrition.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ReportNutrition.name, schema: ReportNutritionSchema },
    ]),
  ],
  providers: [ReportsNutritionService],
  controllers: [ReportsNutritionController],
})
export class ReportsNutritionModule {}
