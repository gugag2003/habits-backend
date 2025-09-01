import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Habit } from './habit.entity';

/**
 * Represents a user of the habits application. Each user has a unique
 * identifier (provided by the frontend in the Authorization header), the
 * timestamp when the user was first seen, and a list of associated habits.
 */
@Entity()
export class User {
  /**
   * The client‐provided identifier. This value comes from the
   * `Authorization` header and is stored as is. Using `PrimaryColumn`
   * instead of `PrimaryGeneratedColumn` allows the frontend to manage
   * identifiers itself.
   */
  @PrimaryColumn()
  id: string;

  /**
   * The epoch timestamp (in milliseconds) when the user was created.
   */
  @Column({ type: 'integer' })
  created: number;

  /**
   * The list of habits belonging to this user. The `cascade` option
   * automatically persists and removes habits when the user is saved or
   * deleted.
   */
  @OneToMany(() => Habit, (habit) => habit.user, { cascade: true })
  habits: Habit[];
}