import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    private readonly logger;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<import("../../common/interfaces/api-response.interface").IApiResponse<{
        accessToken: string;
        refreshToken: string;
    }> | undefined>;
    login(dto: LoginDto): Promise<import("../../common/interfaces/api-response.interface").IApiResponse<{
        id: number;
        email: string;
        accessToken: string;
        refreshToken: string;
    }> | undefined>;
    private validateRegistration;
    private createUser;
    private buildSuccessResponse;
    private authenticateUser;
    private handleRegistrationError;
    private handleLoginError;
    private generateTokens;
}
