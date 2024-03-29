import { Controller, Put, Body, UseGuards, Request } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import mongoose from 'mongoose';
import { ReportsNutritionService } from './reports-nutrition.service';
import { CreateReportNutritionDto } from './dto/report-nutrition.dto';

@Controller('reports-nutrition')
export class ReportsNutritionController {
  constructor(
    private readonly reportsNutritionService: ReportsNutritionService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Put()
  async createReport(
    @Request() req,
    @Body() createReportNutritionDto: CreateReportNutritionDto,
  ) {
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    return await this.reportsNutritionService.createReport(
      createReportNutritionDto,
      userId,
    );
  }
}
