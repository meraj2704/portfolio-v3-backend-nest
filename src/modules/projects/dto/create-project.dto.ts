import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

export class ResourceDto {
  @ApiProperty({ description: 'Resource name', example: 'API Documentation' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Resource URL',
    example: 'https://docs.example.com',
  })
  @IsUrl()
  url: string;

  @ApiProperty({
    description: 'Resource type',
    enum: $Enums.ResourceType,
    example: $Enums.ResourceType.DOCUMENTATION,
  })
  @IsEnum($Enums.ResourceType)
  type: $Enums.ResourceType;
}

export class CreateProjectDto {
  @ApiProperty({ description: 'Project name', example: 'E-commerce Platform' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Project slug (unique)',
    example: 'ecommerce-platform',
  })
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiProperty({
    description: 'Short overview',
    example: 'A modern e-commerce solution',
  })
  @IsNotEmpty()
  @IsString()
  overview: string;

  @ApiPropertyOptional({
    description: 'Detailed description',
    example: 'Full description...',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Live demo URL',
    example: 'https://demo.example.com',
  })
  @IsOptional()
  @IsUrl()
  liveDemo?: string;

  @ApiPropertyOptional({
    description: 'GitHub repository URL',
    example: 'https://github.com/username/repo',
  })
  @IsOptional()
  @IsUrl()
  githubLink?: string;

  @ApiProperty({ type: [ResourceDto], description: 'Project resources' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResourceDto)
  resources: ResourceDto[];

  @ApiProperty({
    description: 'Thumbnail image URL',
    example: 'https://example.com/thumbnail.jpg',
  })
  @IsUrl()
  thumbnail: string;

  @ApiProperty({
    type: [String],
    description: 'Project image URLs',
    example: ['https://example.com/image1.jpg'],
  })
  @IsArray()
  @IsUrl({}, { each: true })
  images: string[];

  @ApiPropertyOptional({ description: 'Featured project flag', default: false })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional({
    description: 'Project status',
    enum: $Enums.ProjectStatus,
    default: $Enums.ProjectStatus.DRAFT,
  })
  @IsOptional()
  @IsEnum($Enums.ProjectStatus)
  status?: $Enums.ProjectStatus;

  @ApiPropertyOptional({
    description: 'Start date (ISO string)',
    example: '2023-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    description: 'End date (ISO string)',
    example: '2023-06-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
