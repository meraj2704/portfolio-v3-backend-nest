import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
import { CreateTechnologyDto } from './dto/create-technology.dto';
export declare class TechnologyService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    create(dto: CreateTechnologyDto): Promise<import("../../common/interfaces/api-response.interface").IApiResponse<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        icon: string | null;
        category: string | null;
    }> | undefined>;
    findAll(): Promise<import("../../common/interfaces/api-response.interface").IApiResponse<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        icon: string | null;
        category: string | null;
    }[]> | undefined>;
    findOne(id: number): Promise<import("../../common/interfaces/api-response.interface").IApiResponse<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        icon: string | null;
        category: string | null;
    }>>;
    update(id: number, dto: UpdateTechnologyDto): Promise<import("../../common/interfaces/api-response.interface").IApiResponse<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        icon: string | null;
        category: string | null;
    }> | undefined>;
    remove(id: number): Promise<import("../../common/interfaces/api-response.interface").IApiResponse<null>>;
    private validateTechnologyCreation;
    private verifyTechnologyExists;
    private handleCreateError;
    private handleUpdateError;
}
