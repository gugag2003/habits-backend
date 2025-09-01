import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitsModule } from './habits/habits.module';
import { User } from './entities/user.entity';
import { Habit } from './entities/habit.entity';

/**
 * The root module of the application. It sets up the database connection
 * and imports the feature modules. In this case we use a local SQLite
 * database stored in a file named `db.sqlite`. The `synchronize` option
 * automatically creates database tables from entity definitions in development.
 */
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Habit],
      synchronize: true,
    }),
    HabitsModule,
  ],
})
export class AppModule {}