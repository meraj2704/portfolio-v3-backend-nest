import { TechnologyService } from './technology.service';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
export declare class TechnologyController {
    private readonly technologyService;
    constructor(technologyService: TechnologyService);
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
}
