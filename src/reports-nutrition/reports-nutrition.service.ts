import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { calcTotalNutrientTimeLine } from 'src/helpers/meals.helpers';
import {
  DailyMacros,
  DailyMacrosDocument,
} from 'src/meals/schemas/dailyMacros.schema';

import { CreateReportNutritionDto } from './dto/report-nutrition.dto';
import {
  ReportNutrition,
  ReportNutritionDocument,
} from './schemas/report-nutrition.schema';

@Injectable()
export class ReportsNutritionService {
  constructor(
    @InjectModel(ReportNutrition.name)
    private reportNutritionModel: Model<ReportNutritionDocument>,
    @InjectModel(DailyMacros.name)
    private dailyMacrosModel: Model<DailyMacrosDocument>,
  ) {}

  async createReport(
    createReportNutritionDto: CreateReportNutritionDto,
    user_id,
  ) {
    const { startDate, endDate, timeLine } = createReportNutritionDto;

    const daysInRange = await this.dailyMacrosModel
      .find({
        date: {
          $gte: new Date(new Date(startDate).setHours(0, 0, 0)),
          $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
        },
        user_id,
      })
      .select(
        'date caloriesConsumed carbsConsumed proteinConsumed fatsConsumed',
      )
      .sort({ date: 'asc' });

    const totalNutrients = calcTotalNutrientTimeLine(daysInRange);

    const query = { startDate, endDate, user_id };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    const report = {
      timeLine,
      startDate,
      endDate,
      daysMacros: daysInRange,
      ...totalNutrients,
      user_id,
    };

    return await this.reportNutritionModel.findOneAndUpdate(
      query,
      report,
      options,
    );
  }
}
