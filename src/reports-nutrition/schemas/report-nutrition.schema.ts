import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { User } from 'src/users/schemas/user.schema';
import { DailyMacrosForReportDto } from '../dto/report-nutrition.dto';

export type ReportNutritionDocument = HydratedDocument<ReportNutrition>;

@Schema()
export class ReportNutrition {
  @Prop()
  timeLine: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  daysMacros: DailyMacrosForReportDto[];

  @Prop()
  totalCalories: number;

  @Prop()
  totalCarbs: number;

  @Prop()
  totalProtein: number;

  @Prop()
  totalFats: number;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  user_id: User;
}

export const ReportNutritionSchema =
  SchemaFactory.createForClass(ReportNutrition);
