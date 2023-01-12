import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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
  ) {}

  async createReport(createReportNutritionDto: CreateReportNutritionDto) {
    return createReportNutritionDto;
  }
}
