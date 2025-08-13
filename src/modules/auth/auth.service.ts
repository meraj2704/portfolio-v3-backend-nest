import { id } from './../../../node_modules/effect/src/Fiber';
import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { ApiResponseBuilder } from 'src/common/utils/ApiResponseBuilder';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    await this.validateRegistration(dto);

    try {
      const user = await this.createUser(dto);
      return this.buildSuccessResponse(user);
    } catch (error) {
      this.handleRegistrationError(error, dto.email);
    }
  }

  async login(dto: LoginDto) {
    try {
      const user = await this.authenticateUser(dto);
      const tokens = this.generateTokens(user);
      return ApiResponseBuilder.success({
        id: user.id,
        email: user.email,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
    } catch (error) {
      this.handleLoginError(error, dto.email);
    }
  }

  // ========== Helper Methods ==========
  private async validateRegistration(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
  }

  private async createUser(dto: RegisterDto) {
    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: await bcrypt.hash(dto.password, 12),
        name: dto.name,
      },
    });
  }

  private buildSuccessResponse(user: any) {
    this.logger.log(`User created: ${user.email}`);
    return ApiResponseBuilder.success(
      this.generateTokens(user),
      'User created successfully',
      HttpStatus.CREATED,
    );
  }

  private async authenticateUser(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      select: { id: true, email: true, password: true },
    });

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  private handleRegistrationError(error: Error, email: string) {
    this.logger.error(`Registration failed for ${email}`, error.stack);

    if (error instanceof ConflictException) throw error;
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new InternalServerErrorException('Database operation failed');
    }
    throw new InternalServerErrorException('Registration failed');
  }

  private handleLoginError(error: Error, email: string) {
    this.logger.error(`Login failed for ${email}`, error.stack);

    if (error instanceof UnauthorizedException) throw error;
    throw new InternalServerErrorException('Login failed');
  }

  private generateTokens(user: any) {
    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '15m' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }
}
