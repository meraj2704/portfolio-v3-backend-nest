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
var TechnologyService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnologyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const ApiResponseBuilder_1 = require("../../common/utils/ApiResponseBuilder");
let TechnologyService = TechnologyService_1 = class TechnologyService {
    prisma;
    logger = new common_1.Logger(TechnologyService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        await this.validateTechnologyCreation(dto);
        try {
            const technology = await this.prisma.technology.create({
                data: {
                    name: dto.name,
                    icon: dto.icon,
                },
            });
            this.logger.log(`Technology created: ${technology.name}`);
            return ApiResponseBuilder_1.ApiResponseBuilder.success(technology, 'Technology created successfully', common_1.HttpStatus.CREATED);
        }
        catch (error) {
            this.handleCreateError(error, dto.name);
        }
    }
    async findAll() {
        try {
            const technologies = await this.prisma.technology.findMany();
            return ApiResponseBuilder_1.ApiResponseBuilder.success(technologies);
        }
        catch (error) {
            if (error instanceof Error) {
                this.logger.error('Failed to fetch technologies', error.stack);
                throw new common_1.InternalServerErrorException('Failed to fetch technologies');
            }
        }
    }
    async findOne(id) {
        try {
            const technology = await this.prisma.technology.findUnique({
                where: { id },
            });
            if (!technology) {
                throw new common_1.NotFoundException(`Technology with ID ${id} not found`);
            }
            return ApiResponseBuilder_1.ApiResponseBuilder.success(technology);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            if (error instanceof Error) {
                this.logger.error(`Failed to fetch technology with ID ${id}`, error.stack);
            }
            throw new common_1.InternalServerErrorException('Failed to fetch technology');
        }
    }
    async update(id, dto) {
        await this.verifyTechnologyExists(id);
        try {
            const updatedTechnology = await this.prisma.technology.update({
                where: { id },
                data: dto,
            });
            this.logger.log(`Technology updated: ${updatedTechnology.name}`);
            return ApiResponseBuilder_1.ApiResponseBuilder.success(updatedTechnology, 'Technology updated successfully');
        }
        catch (error) {
            this.handleUpdateError(error, id);
        }
    }
    async remove(id) {
        await this.verifyTechnologyExists(id);
        try {
            await this.prisma.technology.delete({
                where: { id },
            });
            this.logger.log(`Technology deleted: ID ${id}`);
            return ApiResponseBuilder_1.ApiResponseBuilder.success(null, 'Technology deleted successfully');
        }
        catch (error) {
            if (error instanceof Error) {
                this.logger.error(`Failed to delete technology with ID ${id}`, error.stack);
            }
            throw new common_1.InternalServerErrorException('Failed to delete technology');
        }
    }
    async validateTechnologyCreation(dto) {
        const existingTech = await this.prisma.technology.findUnique({
            where: { name: dto.name },
        });
        if (existingTech) {
            throw new common_1.ConflictException('Technology with this name already exists');
        }
    }
    async verifyTechnologyExists(id) {
        const exists = await this.prisma.technology.findUnique({
            where: { id },
            select: { id: true },
        });
        if (!exists) {
            throw new common_1.NotFoundException(`Technology with ID ${id} not found`);
        }
    }
    handleCreateError(error, name) {
        const errorMessage = error instanceof Error ? error.stack : String(error);
        this.logger.error(`Creation failed for ${name}`, errorMessage);
        if (error instanceof common_1.ConflictException)
            throw error;
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            throw new common_1.InternalServerErrorException('Database operation failed');
        }
        throw new common_1.InternalServerErrorException('Technology creation failed');
    }
    handleUpdateError(error, id) {
        const errorMessage = error instanceof Error ? error.stack : String(error);
        this.logger.error(`Update failed for technology ID ${id}`, errorMessage);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            throw new common_1.InternalServerErrorException('Database operation failed');
        }
        throw new common_1.InternalServerErrorException('Technology update failed');
    }
};
exports.TechnologyService = TechnologyService;
exports.TechnologyService = TechnologyService = TechnologyService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TechnologyService);
//# sourceMappingURL=technology.service.js.map