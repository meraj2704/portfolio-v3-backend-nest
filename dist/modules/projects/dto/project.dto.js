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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const technology_dto_1 = require("../../technology/dto/technology.dto");
const create_project_dto_1 = require("./create-project.dto");
class ProjectDto {
    id;
    name;
    slug;
    overview;
    description;
    liveDemo;
    githubLink;
    resources;
    thumbnail;
    images;
    featured;
    status;
    startDate;
    endDate;
    createdAt;
    updatedAt;
    technologies;
}
exports.ProjectDto = ProjectDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project ID', example: 1 }),
    __metadata("design:type", Number)
], ProjectDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project name', example: 'E-commerce Platform' }),
    __metadata("design:type", String)
], ProjectDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Project slug (unique)',
        example: 'ecommerce-platform',
    }),
    __metadata("design:type", String)
], ProjectDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Short overview',
        example: 'A modern e-commerce solution',
    }),
    __metadata("design:type", String)
], ProjectDto.prototype, "overview", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Detailed description',
        example: 'Full description...',
        nullable: true,
    }),
    __metadata("design:type", Object)
], ProjectDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Live demo URL',
        example: 'https://demo.example.com',
        nullable: true,
    }),
    __metadata("design:type", Object)
], ProjectDto.prototype, "liveDemo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'GitHub repository URL',
        example: 'https://github.com/username/repo',
        nullable: true,
    }),
    __metadata("design:type", Object)
], ProjectDto.prototype, "githubLink", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [create_project_dto_1.ResourceDto], description: 'Project resources' }),
    __metadata("design:type", Array)
], ProjectDto.prototype, "resources", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thumbnail image URL',
        example: 'https://example.com/thumbnail.jpg',
    }),
    __metadata("design:type", String)
], ProjectDto.prototype, "thumbnail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [String],
        description: 'Project image URLs',
        example: ['https://example.com/image1.jpg'],
    }),
    __metadata("design:type", Array)
], ProjectDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Featured project flag', example: false }),
    __metadata("design:type", Boolean)
], ProjectDto.prototype, "featured", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Project status',
        enum: client_1.$Enums.ProjectStatus,
        example: client_1.$Enums.ProjectStatus.DRAFT,
    }),
    __metadata("design:type", String)
], ProjectDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Start date',
        example: '2023-01-01T00:00:00.000Z',
        nullable: true,
    }),
    __metadata("design:type", Object)
], ProjectDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'End date',
        example: '2023-06-01T00:00:00.000Z',
        nullable: true,
    }),
    __metadata("design:type", Object)
], ProjectDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Creation date',
        example: '2023-01-01T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], ProjectDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last update date',
        example: '2023-01-02T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], ProjectDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [technology_dto_1.TechnologyDto], description: 'Project technologies' }),
    __metadata("design:type", Array)
], ProjectDto.prototype, "technologies", void 0);
//# sourceMappingURL=project.dto.js.map