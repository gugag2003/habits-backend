"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HabitsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const habits_service_1 = require("./habits.service");
const habits_controller_1 = require("./habits.controller");
const user_entity_1 = require("../entities/user.entity");
const habit_entity_1 = require("../entities/habit.entity");
const user_middleware_1 = require("../middleware/user.middleware");
let HabitsModule = class HabitsModule {
    configure(consumer) {
        consumer.apply(user_middleware_1.UserMiddleware).forRoutes(habits_controller_1.HabitsController);
    }
};
exports.HabitsModule = HabitsModule;
exports.HabitsModule = HabitsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, habit_entity_1.Habit])],
        controllers: [habits_controller_1.HabitsController],
        providers: [habits_service_1.HabitsService],
    })
], HabitsModule);
//# sourceMappingURL=habits.module.js.map