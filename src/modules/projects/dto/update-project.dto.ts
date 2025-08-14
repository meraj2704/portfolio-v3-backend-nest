import { ApiPropertyOptional } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ResourceUpdateDto } from './resoruce.dto';

export class ResourceOperationDto {
  @ApiPropertyOptional({ enum: ['create', 'update', 'delete'] })
  operation: 'create' | 'update' | 'delete';

  @ApiPropertyOptional()
  id?: number;

  @ApiPropertyOptional({ type: () => ResourceUpdateDto })
  @ValidateNested()
  @Type(() => ResourceUpdateDto)
  data?: ResourceUpdateDto;
}

export class UpdateProjectDto {
  @ApiPropertyOptional({
    description: 'Project name',
    example: 'Updated E-commerce Platform',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Project slug (unique)',
    example: 'updated-ecommerce-platform',
  })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({
    description: 'Short overview',
    example: 'An updated e-commerce solution',
  })
  @IsOptional()
  @IsString()
  overview?: string;

  @ApiPropertyOptional({
    description: 'Detailed description',
    example: 'Updated full description...',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Live demo URL',
    example: 'https://updated-demo.example.com',
  })
  @IsOptional()
  @IsUrl()
  liveDemo?: string;

  @ApiPropertyOptional({
    description: 'GitHub repository URL',
    example: 'https://github.com/username/updated-repo',
  })
  @IsOptional()
  @IsUrl()
  githubLink?: string;

  @ApiPropertyOptional({
    description: 'Thumbnail image URL',
    example: 'https://example.com/updated-thumbnail.jpg',
  })
  @IsOptional()
  @IsUrl()
  thumbnail?: string;

  @ApiPropertyOptional({
    type: [String],
    description: 'Project image URLs',
    example: ['https://example.com/updated-image1.jpg'],
  })
  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  images?: string[];

  @ApiPropertyOptional({ description: 'Featured project flag' })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional({
    description: 'Project status',
    enum: $Enums.ProjectStatus,
    example: $Enums.ProjectStatus.PUBLISHED,
  })
  @IsOptional()
  @IsEnum($Enums.ProjectStatus)
  status?: $Enums.ProjectStatus;

  @ApiPropertyOptional({ type: () => ResourceOperationDto, isArray: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResourceOperationDto)
  resourceOperations?: ResourceOperationDto[];
}
