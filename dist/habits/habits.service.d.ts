import { Repository } from 'typeorm';
import { Habit } from '../entities/habit.entity';
import { User } from '../entities/user.entity';
export declare class HabitsService {
    private habitsRepository;
    private usersRepository;
    constructor(habitsRepository: Repository<Habit>, usersRepository: Repository<User>);
    findUserWithHabits(userId: string): Promise<User | null>;
    getHabits(user: User): Promise<User>;
    createHabit(user: User, name?: string): Promise<User>;
    deleteHabit(user: User, id: string): Promise<User>;
    renameHabit(user: User, id: string, name: string): Promise<User>;
    logDay(user: User, id: string, day: string): Promise<User>;
    unlogDay(user: User, id: string, day: string): Promise<User>;
}
