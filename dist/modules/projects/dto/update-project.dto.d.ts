import { $Enums } from '@prisma/client';
import { ResourceUpdateDto } from './resoruce.dto';
export declare class ResourceOperationDto {
    operation: 'create' | 'update' | 'delete';
    id?: number;
    data?: ResourceUpdateDto;
}
export declare class UpdateProjectDto {
    name?: string;
    slug?: string;
    overview?: string;
    description?: string;
    liveDemo?: string;
    githubLink?: string;
    thumbnail?: string;
    images?: string[];
    featured?: boolean;
    status?: $Enums.ProjectStatus;
    resourceOperations?: ResourceOperationDto[];
}
