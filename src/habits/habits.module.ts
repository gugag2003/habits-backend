import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitsService } from './habits.service';
import { HabitsController } from './habits.controller';
import { User } from '../entities/user.entity';
import { Habit } from '../entities/habit.entity';
import { UserMiddleware } from '../middleware/user.middleware';

/**
 * Module that wires together the habits controller, service, entities, and
 * middleware. The middleware is applied to all routes in this module
 * to ensure that each request has an associated user.
 */
@Module({
  imports: [TypeOrmModule.forFeature([User, Habit])],
  controllers: [HabitsController],
  providers: [HabitsService],
})
export class HabitsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(HabitsController);
  }
}