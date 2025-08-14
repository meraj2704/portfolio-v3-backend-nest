// src/modules/projects/dto/resource-types.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';

export class ResourceUpdateDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  url?: string;

  @ApiProperty({ enum: $Enums.ResourceType })
  @IsOptional()
  @IsEnum($Enums.ResourceType)
  type?: $Enums.ResourceType;
}
