import { $Enums } from '@prisma/client';
import { TechnologyDto } from '../../technology/dto/technology.dto';
import { ResourceDto } from './create-project.dto';
export declare class ProjectDto {
    id: number;
    name: string;
    slug: string;
    overview: string;
    description: string | null;
    liveDemo: string | null;
    githubLink: string | null;
    resources: ResourceDto[];
    thumbnail: string;
    images: string[];
    featured: boolean;
    status: $Enums.ProjectStatus;
    startDate: Date | null;
    endDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
    technologies: TechnologyDto[];
}
