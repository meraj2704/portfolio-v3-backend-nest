import { $Enums } from '@prisma/client';
export declare class ResourceDto {
    name: string;
    url: string;
    type: $Enums.ResourceType;
}
export declare class CreateProjectDto {
    name: string;
    slug: string;
    overview: string;
    description?: string;
    liveDemo?: string;
    githubLink?: string;
    resources: ResourceDto[];
    thumbnail: string;
    images: string[];
    featured?: boolean;
    status?: $Enums.ProjectStatus;
    startDate?: string;
    endDate?: string;
}
