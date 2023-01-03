import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { MealsDto } from '../dto/dailyMacros.dto';

export type DailyMacrosDocument = HydratedDocument<DailyMacros>;

@Schema()
export class DailyMacros {
  @Prop()
  date: Date;

  @Prop()
  caloriesConsumed: number;

  @Prop()
  carbsConsumed: number;

  @Prop()
  proteinConsumed: number;

  @Prop()
  fatsConsumed: number;

  @Prop()
  meals: MealsDto;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  user_id: User;
}

export const DailyMacrosSchema = SchemaFactory.createForClass(DailyMacros);
