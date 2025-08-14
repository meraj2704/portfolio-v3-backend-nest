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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const ApiResponseBuilder_1 = require("../../common/utils/ApiResponseBuilder");
const prisma_service_1 = require("../../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const client_1 = require("@prisma/client");
let AuthService = AuthService_1 = class AuthService {
    prisma;
    jwtService;
    logger = new common_1.Logger(AuthService_1.name);
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(dto) {
        await this.validateRegistration(dto);
        try {
            const user = await this.createUser(dto);
            return this.buildSuccessResponse(user);
        }
        catch (error) {
            this.handleRegistrationError(error, dto.email);
        }
    }
    async login(dto) {
        try {
            const user = await this.authenticateUser(dto);
            const tokens = this.generateTokens(user);
            return ApiResponseBuilder_1.ApiResponseBuilder.success({
                id: user.id,
                email: user.email,
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            });
        }
        catch (error) {
            this.handleLoginError(error, dto.email);
        }
    }
    async validateRegistration(dto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Email already exists');
        }
    }
    async createUser(dto) {
        return this.prisma.user.create({
            data: {
                email: dto.email,
                password: await bcrypt.hash(dto.password, 12),
                name: dto.name,
            },
        });
    }
    buildSuccessResponse(user) {
        this.logger.log(`User created: ${user.email}`);
        return ApiResponseBuilder_1.ApiResponseBuilder.success(this.generateTokens(user), 'User created successfully', common_1.HttpStatus.CREATED);
    }
    async authenticateUser(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
            select: { id: true, email: true, password: true },
        });
        if (!user || !(await bcrypt.compare(dto.password, user.password))) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return user;
    }
    handleRegistrationError(error, email) {
        const errorMessage = error instanceof Error ? error.stack : String(error);
        this.logger.error(`Registration failed for ${email}`, errorMessage);
        if (error instanceof common_1.ConflictException)
            throw error;
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            throw new common_1.InternalServerErrorException('Database operation failed');
        }
        throw new common_1.InternalServerErrorException('Registration failed');
    }
    handleLoginError(error, email) {
        const errorMessage = error instanceof Error ? error.stack : String(error);
        this.logger.error(`Login failed for ${email}`, errorMessage);
        if (error instanceof common_1.UnauthorizedException)
            throw error;
        throw new common_1.InternalServerErrorException('Login failed');
    }
    generateTokens(user) {
        const payload = { sub: user.id, email: user.email };
        return {
            accessToken: this.jwtService.sign(payload, { expiresIn: '15m' }),
            refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map