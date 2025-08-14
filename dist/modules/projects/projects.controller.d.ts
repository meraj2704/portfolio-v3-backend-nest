import { ProjectService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Request } from 'express';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    create(req: Request, createProjectDto: CreateProjectDto): Promise<import("../../common/interfaces/api-response.interface").IApiResponse<{
        resources: {
            type: import(".prisma/client").$Enums.ResourceType;
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            url: string;
            projectId: number;
        }[];
        technologies: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            icon: string | null;
            category: string | null;
        }[];
    } & {
        description: string | null;
        id: number;
        name: string;
        slug: string;
        overview: string;
        liveDemo: string | null;
        githubLink: string | null;
        thumbnail: string;
        images: string[];
        featured: boolean;
        status: import(".prisma/client").$Enums.ProjectStatus;
        startDate: Date | null;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }> | undefined>;
    findAll(): Promise<import("../../common/interfaces/api-response.interface").IApiResponse<({
        resources: {
            type: import(".prisma/client").$Enums.ResourceType;
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            url: string;
            projectId: number;
        }[];
        technologies: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            icon: string | null;
            category: string | null;
        }[];
    } & {
        description: string | null;
        id: number;
        name: string;
        slug: string;
        overview: string;
        liveDemo: string | null;
        githubLink: string | null;
        thumbnail: string;
        images: string[];
        featured: boolean;
        status: import(".prisma/client").$Enums.ProjectStatus;
        startDate: Date | null;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
    })[]> | undefined>;
    findOne(id: number): Promise<import("../../common/interfaces/api-response.interface").IApiResponse<{
        resources: {
            type: import(".prisma/client").$Enums.ResourceType;
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            url: string;
            projectId: number;
        }[];
        technologies: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            icon: string | null;
            category: string | null;
        }[];
    } & {
        description: string | null;
        id: number;
        name: string;
        slug: string;
        overview: string;
        liveDemo: string | null;
        githubLink: string | null;
        thumbnail: string;
        images: string[];
        featured: boolean;
        status: import(".prisma/client").$Enums.ProjectStatus;
        startDate: Date | null;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }> | undefined>;
    update(id: number, updateProjectDto: UpdateProjectDto): Promise<import("../../common/interfaces/api-response.interface").IApiResponse<{
        resources: {
            type: import(".prisma/client").$Enums.ResourceType;
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            url: string;
            projectId: number;
        }[];
    } & {
        description: string | null;
        id: number;
        name: string;
        slug: string;
        overview: string;
        liveDemo: string | null;
        githubLink: string | null;
        thumbnail: string;
        images: string[];
        featured: boolean;
        status: import(".prisma/client").$Enums.ProjectStatus;
        startDate: Date | null;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }> | undefined>;
    remove(id: number): Promise<import("../../common/interfaces/api-response.interface").IApiResponse<null> | undefined>;
}
