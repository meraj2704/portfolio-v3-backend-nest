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
exports.TechnologyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const technology_service_1 = require("./technology.service");
const technology_dto_1 = require("./dto/technology.dto");
const create_technology_dto_1 = require("./dto/create-technology.dto");
const update_technology_dto_1 = require("./dto/update-technology.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let TechnologyController = class TechnologyController {
    technologyService;
    constructor(technologyService) {
        this.technologyService = technologyService;
    }
    async create(dto) {
        return this.technologyService.create(dto);
    }
    async findAll() {
        return this.technologyService.findAll();
    }
    async findOne(id) {
        return this.technologyService.findOne(+id);
    }
    async update(id, dto) {
        return this.technologyService.update(+id, dto);
    }
    async remove(id) {
        return this.technologyService.remove(+id);
    }
};
exports.TechnologyController = TechnologyController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new technology' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Technology created successfully',
        type: technology_dto_1.TechnologyDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Technology name already exists' }),
    (0, swagger_1.ApiBody)({ type: create_technology_dto_1.CreateTechnologyDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_technology_dto_1.CreateTechnologyDto]),
    __metadata("design:returntype", Promise)
], TechnologyController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all technologies' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of technologies',
        type: [technology_dto_1.TechnologyDto],
    }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false, example: 'Frontend' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TechnologyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a technology by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Technology details',
        type: technology_dto_1.TechnologyDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Technology not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', example: 1 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TechnologyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a technology' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Technology updated successfully',
        type: technology_dto_1.TechnologyDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Technology not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', example: 1 }),
    (0, swagger_1.ApiBody)({ type: update_technology_dto_1.UpdateTechnologyDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_technology_dto_1.UpdateTechnologyDto]),
    __metadata("design:returntype", Promise)
], TechnologyController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a technology' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Technology deleted successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Technology not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', example: 1 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TechnologyController.prototype, "remove", null);
exports.TechnologyController = TechnologyController = __decorate([
    (0, swagger_1.ApiTags)('Technologies'),
    (0, common_1.Controller)('technologies'),
    __metadata("design:paramtypes", [technology_service_1.TechnologyService])
], TechnologyController);
//# sourceMappingURL=technology.controller.js.map