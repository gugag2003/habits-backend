import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habit } from '../entities/habit.entity';
import { User } from '../entities/user.entity';
import { v4 as uuid } from 'uuid';

/**
 * Service that encapsulates all business logic related to habits. It
 * interacts with the database through TypeORM repositories.
 */
@Injectable()
export class HabitsService {
  constructor(
    @InjectRepository(Habit)
    private habitsRepository: Repository<Habit>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Returns a user and their habits from the database. Used to refresh
   * the state after each operation.
   */
  findUserWithHabits(userId: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id: userId },
      relations: ['habits'],
    });
  }

  /**
   * Returns the current user and habits. The controller will have
   * already attached the user to the request via middleware.
   */
  async getHabits(user: User) {
    return this.findUserWithHabits(user.id);
  }

  /**
   * Creates a new habit for the given user with an optional name. A
   * UUID is assigned to each habit. After creation the updated
   * user state is returned.
   */
  async createHabit(user: User, name?: string) {
    const habit = this.habitsRepository.create({
      id: uuid(),
      name: name || '',
      created: Date.now(),
      completed: [],
      user,
    });
    await this.habitsRepository.save(habit);
    return this.findUserWithHabits(user.id);
  }

  /**
   * Deletes a habit by id for the given user and returns the updated
   * user state. The deletion is scoped to the user so that one user
   * cannot delete another user's habit by id.
   */
  async deleteHabit(user: User, id: string) {
    await this.habitsRepository.delete({ id, user: { id: user.id } as any });
    return this.findUserWithHabits(user.id);
  }

  /**
   * Renames a habit by id for the given user and returns the updated
   * user state. The operation is scoped to the user.
   */
  async renameHabit(user: User, id: string, name: string) {
    await this.habitsRepository.update(
      { id, user: { id: user.id } as any },
      { name },
    );
    return this.findUserWithHabits(user.id);
  }

  /**
   * Marks a day as completed for a habit. If the day is already logged
   * nothing changes. Returns the updated user state.
   */
  async logDay(user: User, id: string, day: string) {
    const habit = await this.habitsRepository.findOne({
      where: { id, user: { id: user.id } as any },
    });
    if (!habit) return this.findUserWithHabits(user.id);
    // Avoid duplicates
    if (!habit.completed.includes(day)) {
      habit.completed.push(day);
      await this.habitsRepository.save(habit);
    }
    return this.findUserWithHabits(user.id);
  }

  /**
   * Removes a day from the completed list for a habit. If the day is not
   * present nothing changes. Returns the updated user state.
   */
  async unlogDay(user: User, id: string, day: string) {
    const habit = await this.habitsRepository.findOne({
      where: { id, user: { id: user.id } as any },
    });
    if (!habit) return this.findUserWithHabits(user.id);
    const index = habit.completed.indexOf(day);
    if (index !== -1) {
      habit.completed.splice(index, 1);
      await this.habitsRepository.save(habit);
    }
    return this.findUserWithHabits(user.id);
  }
}