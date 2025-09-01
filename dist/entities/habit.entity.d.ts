import { User } from './user.entity';
export declare class Habit {
    id: string;
    name: string;
    completed: string[];
    created: number;
    user: User;
}
