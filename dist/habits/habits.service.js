"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HabitsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const habit_entity_1 = require("../entities/habit.entity");
const user_entity_1 = require("../entities/user.entity");
const uuid_1 = require("uuid");
let HabitsService = class HabitsService {
    constructor(habitsRepository, usersRepository) {
        this.habitsRepository = habitsRepository;
        this.usersRepository = usersRepository;
    }
    findUserWithHabits(userId) {
        return this.usersRepository.findOne({
            where: { id: userId },
            relations: ['habits'],
        });
    }
    async getHabits(user) {
        return this.findUserWithHabits(user.id);
    }
    async createHabit(user, name) {
        const habit = this.habitsRepository.create({
            id: (0, uuid_1.v4)(),
            name: name || '',
            created: Date.now(),
            completed: [],
            user,
        });
        await this.habitsRepository.save(habit);
        return this.findUserWithHabits(user.id);
    }
    async deleteHabit(user, id) {
        await this.habitsRepository.delete({ id, user: { id: user.id } });
        return this.findUserWithHabits(user.id);
    }
    async renameHabit(user, id, name) {
        await this.habitsRepository.update({ id, user: { id: user.id } }, { name });
        return this.findUserWithHabits(user.id);
    }
    async logDay(user, id, day) {
        const habit = await this.habitsRepository.findOne({
            where: { id, user: { id: user.id } },
        });
        if (!habit)
            return this.findUserWithHabits(user.id);
        if (!habit.completed.includes(day)) {
            habit.completed.push(day);
            await this.habitsRepository.save(habit);
        }
        return this.findUserWithHabits(user.id);
    }
    async unlogDay(user, id, day) {
        const habit = await this.habitsRepository.findOne({
            where: { id, user: { id: user.id } },
        });
        if (!habit)
            return this.findUserWithHabits(user.id);
        const index = habit.completed.indexOf(day);
        if (index !== -1) {
            habit.completed.splice(index, 1);
            await this.habitsRepository.save(habit);
        }
        return this.findUserWithHabits(user.id);
    }
};
exports.HabitsService = HabitsService;
exports.HabitsService = HabitsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(habit_entity_1.Habit)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], HabitsService);
//# sourceMappingURL=habits.service.js.map