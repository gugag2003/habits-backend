import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

/**
 * Middleware that attaches a User entity to each request based on the
 * `Authorization` header. If a user does not exist for the given id,
 * it is created on the fly. The user and their habits are then
 * available as `req.user` for downstream handlers.
 */
@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async use(req: Request & { user?: User }, res: Response, next: NextFunction) {
    const id = req.header('Authorization');
    if (!id) {
      return res.status(401).json({ message: 'Missing Authorization header' });
    }
    // Try to find the user along with their habits.
    let user = await this.usersRepository.findOne({
      where: { id },
      relations: ['habits'],
    });
    if (!user) {
      // If the user does not exist, create a new one.
      user = this.usersRepository.create({
        id,
        created: Date.now(),
        habits: [],
      });
      await this.usersRepository.save(user);
    }
    req.user = user;
    next();
  }
}