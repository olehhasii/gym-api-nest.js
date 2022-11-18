import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { FoodDto } from '../dto/meal.dto';

export type MealDocument = HydratedDocument<Meal>;

@Schema()
export class Meal {
  @Prop()
  name: string;

  @Prop()
  food: FoodDto[];

  @Prop()
  totalCalories: number;

  @Prop()
  totalProtein: number;

  @Prop()
  totalFat: number;

  @Prop()
  totalCarbs: number;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  user_id: User;
}

export const MealSchema = SchemaFactory.createForClass(Meal);
