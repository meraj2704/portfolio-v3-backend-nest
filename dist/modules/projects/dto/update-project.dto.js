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
exports.UpdateProjectDto = exports.ResourceOperationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const resoruce_dto_1 = require("./resoruce.dto");
class ResourceOperationDto {
    operation;
    id;
    data;
}
exports.ResourceOperationDto = ResourceOperationDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['create', 'update', 'delete'] }),
    __metadata("design:type", String)
], ResourceOperationDto.prototype, "operation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], ResourceOperationDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => resoruce_dto_1.ResourceUpdateDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => resoruce_dto_1.ResourceUpdateDto),
    __metadata("design:type", resoruce_dto_1.ResourceUpdateDto)
], ResourceOperationDto.prototype, "data", void 0);
class UpdateProjectDto {
    name;
    slug;
    overview;
    description;
    liveDemo;
    githubLink;
    thumbnail;
    images;
    featured;
    status;
    resourceOperations;
}
exports.UpdateProjectDto = UpdateProjectDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Project name',
        example: 'Updated E-commerce Platform',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Project slug (unique)',
        example: 'updated-ecommerce-platform',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Short overview',
        example: 'An updated e-commerce solution',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "overview", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Detailed description',
        example: 'Updated full description...',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Live demo URL',
        example: 'https://updated-demo.example.com',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "liveDemo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'GitHub repository URL',
        example: 'https://github.com/username/updated-repo',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "githubLink", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Thumbnail image URL',
        example: 'https://example.com/updated-thumbnail.jpg',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "thumbnail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [String],
        description: 'Project image URLs',
        example: ['https://example.com/updated-image1.jpg'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUrl)({}, { each: true }),
    __metadata("design:type", Array)
], UpdateProjectDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Featured project flag' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateProjectDto.prototype, "featured", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Project status',
        enum: client_1.$Enums.ProjectStatus,
        example: client_1.$Enums.ProjectStatus.PUBLISHED,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.$Enums.ProjectStatus),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => ResourceOperationDto, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ResourceOperationDto),
    __metadata("design:type", Array)
], UpdateProjectDto.prototype, "resourceOperations", void 0);
//# sourceMappingURL=update-project.dto.js.map