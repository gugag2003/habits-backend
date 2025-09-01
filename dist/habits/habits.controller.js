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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HabitsController = void 0;
const common_1 = require("@nestjs/common");
const habits_service_1 = require("./habits.service");
let HabitsController = class HabitsController {
    constructor(habitsService) {
        this.habitsService = habitsService;
    }
    async getHabits(req) {
        return this.habitsService.getHabits(req.user);
    }
    async createHabit(req, name) {
        return this.habitsService.createHabit(req.user, name);
    }
    async deleteHabit(req, id) {
        return this.habitsService.deleteHabit(req.user, id);
    }
    async renameHabit(req, id, name) {
        return this.habitsService.renameHabit(req.user, id, name);
    }
    async logDay(req, id, day) {
        return this.habitsService.logDay(req.user, id, day);
    }
    async unlogDay(req, id, day) {
        return this.habitsService.unlogDay(req.user, id, day);
    }
};
exports.HabitsController = HabitsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HabitsController.prototype, "getHabits", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], HabitsController.prototype, "createHabit", null);
__decorate([
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], HabitsController.prototype, "deleteHabit", null);
__decorate([
    (0, common_1.Post)('rename'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('id')),
    __param(2, (0, common_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], HabitsController.prototype, "renameHabit", null);
__decorate([
    (0, common_1.Post)('log'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('id')),
    __param(2, (0, common_1.Body)('day')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], HabitsController.prototype, "logDay", null);
__decorate([
    (0, common_1.Post)('unlog'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('id')),
    __param(2, (0, common_1.Body)('day')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], HabitsController.prototype, "unlogDay", null);
exports.HabitsController = HabitsController = __decorate([
    (0, common_1.Controller)('habits'),
    __metadata("design:paramtypes", [habits_service_1.HabitsService])
], HabitsController);
//# sourceMappingURL=habits.controller.js.map