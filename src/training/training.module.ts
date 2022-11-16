import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Training, TrainingSchema } from './schema/training.schema';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Training.name, schema: TrainingSchema },
    ]),
  ],
  controllers: [TrainingController],
  providers: [TrainingService],
})
export class TrainingModule {}
