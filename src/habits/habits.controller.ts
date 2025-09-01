import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { User } from '../entities/user.entity';
import { Request } from 'express';

/**
 * Controller that maps HTTP requests to service methods. It relies on
 * the UserMiddleware to attach the current user to the request.
 */
@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  /**
   * GET /habits → returns the current user and their habits.
   */
  @Get()
  async getHabits(@Req() req: Request & { user: User }) {
    return this.habitsService.getHabits(req.user);
  }

  /**
   * POST /habits/create → creates a new habit with the provided name.
   */
  @Post('create')
  async createHabit(
    @Req() req: Request & { user: User },
    @Body('name') name: string,
  ) {
    return this.habitsService.createHabit(req.user, name);
  }

  /**
   * POST /habits/delete → deletes a habit by id.
   */
  @Post('delete')
  async deleteHabit(
    @Req() req: Request & { user: User },
    @Body('id') id: string,
  ) {
    return this.habitsService.deleteHabit(req.user, id);
  }

  /**
   * POST /habits/rename → renames a habit by id.
   */
  @Post('rename')
  async renameHabit(
    @Req() req: Request & { user: User },
    @Body('id') id: string,
    @Body('name') name: string,
  ) {
    return this.habitsService.renameHabit(req.user, id, name);
  }

  /**
   * POST /habits/log → adds a completion day to a habit.
   */
  @Post('log')
  async logDay(
    @Req() req: Request & { user: User },
    @Body('id') id: string,
    @Body('day') day: string,
  ) {
    return this.habitsService.logDay(req.user, id, day);
  }

  /**
   * POST /habits/unlog → removes a completion day from a habit.
   */
  @Post('unlog')
  async unlogDay(
    @Req() req: Request & { user: User },
    @Body('id') id: string,
    @Body('day') day: string,
  ) {
    return this.habitsService.unlogDay(req.user, id, day);
  }
}