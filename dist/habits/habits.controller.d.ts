import { HabitsService } from './habits.service';
import { User } from '../entities/user.entity';
import { Request } from 'express';
export declare class HabitsController {
    private readonly habitsService;
    constructor(habitsService: HabitsService);
    getHabits(req: Request & {
        user: User;
    }): Promise<User>;
    createHabit(req: Request & {
        user: User;
    }, name: string): Promise<User>;
    deleteHabit(req: Request & {
        user: User;
    }, id: string): Promise<User>;
    renameHabit(req: Request & {
        user: User;
    }, id: string, name: string): Promise<User>;
    logDay(req: Request & {
        user: User;
    }, id: string, day: string): Promise<User>;
    unlogDay(req: Request & {
        user: User;
    }, id: string, day: string): Promise<User>;
}
