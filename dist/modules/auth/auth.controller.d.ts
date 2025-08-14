import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<import("../../common/interfaces/api-response.interface").IApiResponse<{
        id: number;
        email: string;
        accessToken: string;
        refreshToken: string;
    }> | undefined>;
    register(dto: RegisterDto): Promise<import("../../common/interfaces/api-response.interface").IApiResponse<{
        accessToken: string;
        refreshToken: string;
    }> | undefined>;
}
