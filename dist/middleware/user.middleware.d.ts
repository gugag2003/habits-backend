import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class UserMiddleware implements NestMiddleware {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    use(req: Request & {
        user?: User;
    }, res: Response, next: NextFunction): Promise<any>;
}
