import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { DailyMacrosDto } from 'src/meals/dto/dailyMacros.dto';
import { User } from 'src/users/schemas/user.schema';

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
  daysMacros: DailyMacrosDto[];

  @Prop()
  totalCalories: number;

  @Prop()
  totalCarbs: number;

  @Prop()
  totalProtein: number;

  @Prop()
  totalFat: number;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  user_id: User;
}

export const ReportNutritionSchema =
  SchemaFactory.createForClass(ReportNutrition);
