import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

import { MealsController } from './meals.controller';
import { MealsService } from './meals.service';
import { Meal, MealSchema } from './schemas/meal.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Meal.name, schema: MealSchema }]),
    HttpModule,
  ],
  controllers: [MealsController],
  providers: [MealsService],
})
export class MealsModule {}
