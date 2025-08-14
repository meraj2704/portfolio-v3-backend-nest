import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class TechnologyDto {
  @ApiProperty({ description: 'Technology ID', example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ description: 'Technology name', example: 'React' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Icon URL', example: 'react-icon.png' })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiPropertyOptional({
    description: 'Technology category',
    example: 'Frontend',
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ description: 'Creation date' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ description: 'Last update date' })
  @IsDate()
  updatedAt: Date;
}
