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
var ProjectService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../prisma/prisma.service");
const ApiResponseBuilder_1 = require("../../common/utils/ApiResponseBuilder");
let ProjectService = ProjectService_1 = class ProjectService {
    prisma;
    logger = new common_1.Logger(ProjectService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProjectDto) {
        await this.validateSlugUnique(createProjectDto.slug);
        try {
            const project = await this.prisma.project.create({
                data: {
                    ...createProjectDto,
                    startDate: createProjectDto.startDate
                        ? new Date(createProjectDto.startDate)
                        : undefined,
                    endDate: createProjectDto.endDate
                        ? new Date(createProjectDto.endDate)
                        : undefined,
                    resources: {
                        create: createProjectDto.resources.map((resource) => ({
                            name: resource.name,
                            url: resource.url,
                            type: resource.type,
                        })),
                    },
                },
                include: {
                    resources: true,
                    technologies: true,
                },
            });
            this.logger.log(`Project created: ${project.name}`);
            return ApiResponseBuilder_1.ApiResponseBuilder.success(project, 'Project created successfully', common_1.HttpStatus.CREATED);
        }
        catch (error) {
            this.handleCreateError(error, createProjectDto.name);
        }
    }
    async findAll() {
        try {
            const projects = await this.prisma.project.findMany({
                include: {
                    resources: true,
                    technologies: true,
                },
            });
            return ApiResponseBuilder_1.ApiResponseBuilder.success(projects);
        }
        catch (error) {
            if (error instanceof Error) {
                this.logger.error('Failed to fetch projects', error.stack);
                throw new common_1.InternalServerErrorException('Failed to fetch projects');
            }
        }
    }
    async findOne(id) {
        try {
            const project = await this.prisma.project.findUnique({
                where: { id },
                include: {
                    resources: true,
                    technologies: true,
                },
            });
            if (!project) {
                throw new common_1.NotFoundException(`Project with ID ${id} not found`);
            }
            return ApiResponseBuilder_1.ApiResponseBuilder.success(project);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            if (error instanceof Error) {
                this.logger.error(`Failed to fetch project with ID ${id}`, error.stack);
                throw new common_1.InternalServerErrorException('Failed to fetch project');
            }
        }
    }
    async update(id, updateProjectDto) {
        await this.verifyProjectExists(id);
        try {
            const prismaUpdateData = {
                ...updateProjectDto,
                ...(updateProjectDto.resourceOperations && {
                    resources: this.transformResourceOperations(updateProjectDto.resourceOperations, id),
                }),
            };
            const updatedProject = await this.prisma.project.update({
                where: { id },
                data: prismaUpdateData,
                include: { resources: true },
            });
            return ApiResponseBuilder_1.ApiResponseBuilder.success(updatedProject);
        }
        catch (error) {
            this.handleUpdateError(error, id);
        }
    }
    transformResourceOperations(operations, projectId) {
        const result = {};
        const creates = operations.filter((op) => op.operation === 'create' && op.data);
        const updates = operations.filter((op) => op.operation === 'update' && op.id && op.data);
        const deletes = operations.filter((op) => op.operation === 'delete' && op.id);
        if (creates.length > 0) {
            result.create = creates.map((op) => ({
                name: op.data.name,
                url: op.data.url,
                type: op.data.type,
                projectId: projectId,
            }));
        }
        if (updates.length > 0) {
            result.update = updates.map((op) => ({
                where: { id: op.id },
                data: {
                    name: op.data.name,
                    url: op.data.url,
                    type: op.data.type,
                },
            }));
        }
        if (deletes.length > 0) {
            result.deleteMany = {
                id: { in: deletes.map((op) => op.id) },
            };
        }
        return result;
    }
    async remove(id) {
        await this.verifyProjectExists(id);
        try {
            await this.prisma.project.delete({
                where: { id },
            });
            this.logger.log(`Project deleted: ID ${id}`);
            return ApiResponseBuilder_1.ApiResponseBuilder.success(null, 'Project deleted successfully');
        }
        catch (error) {
            if (error instanceof Error) {
                this.logger.error(`Failed to delete project with ID ${id}`, error.stack);
                throw new common_1.InternalServerErrorException('Failed to delete project');
            }
        }
    }
    async validateSlugUnique(slug) {
        const existing = await this.prisma.project.findUnique({
            where: { slug },
            select: { id: true },
        });
        if (existing) {
            throw new common_1.ConflictException('Project with this slug already exists');
        }
    }
    async verifyProjectExists(id) {
        const exists = await this.prisma.project.findUnique({
            where: { id },
            select: { id: true },
        });
        if (!exists) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        }
    }
    handleCreateError(error, name) {
        if (error instanceof Error) {
            this.logger.error(`Creation failed for ${name}`, error.stack);
            if (error instanceof common_1.ConflictException)
                throw error;
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                throw new common_1.InternalServerErrorException('Database operation failed');
            }
        }
        throw new common_1.InternalServerErrorException('Project creation failed');
    }
    handleUpdateError(error, id) {
        if (error instanceof Error) {
            this.logger.error(`Update failed for project ID ${id}`, error.stack);
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                throw new common_1.InternalServerErrorException('Database operation failed');
            }
        }
        throw new common_1.InternalServerErrorException('Project update failed');
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = ProjectService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectService);
//# sourceMappingURL=projects.service.js.map