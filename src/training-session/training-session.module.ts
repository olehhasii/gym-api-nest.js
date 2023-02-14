import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingLog, TrainingLogSchema } from './schema/training-log.schema';

import {
  TrainingSession,
  TrainingSessionSchema,
} from './schema/training-session.schema';
import { TrainingSessionController } from './training-session.controller';
import { TrainingSessionService } from './training-session.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TrainingSession.name, schema: TrainingSessionSchema },
      { name: TrainingLog.name, schema: TrainingLogSchema },
    ]),
  ],
  controllers: [TrainingSessionController],
  providers: [TrainingSessionService],
})
export class TrainingSessionModule {}
