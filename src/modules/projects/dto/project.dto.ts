import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { TechnologyDto } from '../../technology/dto/technology.dto';
import { ResourceDto } from './create-project.dto';

export class ProjectDto {
  @ApiProperty({ description: 'Project ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Project name', example: 'E-commerce Platform' })
  name: string;

  @ApiProperty({
    description: 'Project slug (unique)',
    example: 'ecommerce-platform',
  })
  slug: string;

  @ApiProperty({
    description: 'Short overview',
    example: 'A modern e-commerce solution',
  })
  overview: string;

  @ApiProperty({
    description: 'Detailed description',
    example: 'Full description...',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    description: 'Live demo URL',
    example: 'https://demo.example.com',
    nullable: true,
  })
  liveDemo: string | null;

  @ApiProperty({
    description: 'GitHub repository URL',
    example: 'https://github.com/username/repo',
    nullable: true,
  })
  githubLink: string | null;

  @ApiProperty({ type: [ResourceDto], description: 'Project resources' })
  resources: ResourceDto[];

  @ApiProperty({
    description: 'Thumbnail image URL',
    example: 'https://example.com/thumbnail.jpg',
  })
  thumbnail: string;

  @ApiProperty({
    type: [String],
    description: 'Project image URLs',
    example: ['https://example.com/image1.jpg'],
  })
  images: string[];

  @ApiProperty({ description: 'Featured project flag', example: false })
  featured: boolean;

  @ApiProperty({
    description: 'Project status',
    enum: $Enums.ProjectStatus,
    example: $Enums.ProjectStatus.DRAFT,
  })
  status: $Enums.ProjectStatus;

  @ApiProperty({
    description: 'Start date',
    example: '2023-01-01T00:00:00.000Z',
    nullable: true,
  })
  startDate: Date | null;

  @ApiProperty({
    description: 'End date',
    example: '2023-06-01T00:00:00.000Z',
    nullable: true,
  })
  endDate: Date | null;

  @ApiProperty({
    description: 'Creation date',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update date',
    example: '2023-01-02T00:00:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({ type: [TechnologyDto], description: 'Project technologies' })
  technologies: TechnologyDto[];
}
