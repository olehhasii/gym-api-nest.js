import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { ExerciseModule } from './exercise/exercise.module';
import { TrainingModule } from './training/training.module';
import { MealsModule } from './meals/meals.module';
import { ReportsNutritionModule } from './reports-nutrition/reports-nutrition.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}@gym-api.d3c1lgi.mongodb.net/GYM-DB?retryWrites=true&w=majority`,
    ),
    UserModule,
    AuthModule,
    ExerciseModule,
    TrainingModule,
    MealsModule,
    ReportsNutritionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
