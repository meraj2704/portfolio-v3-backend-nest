import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class UpdateTechnologyDto {
  @ApiPropertyOptional({
    description: 'The name of the technology (must be unique)',
    example: 'ReactJS',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'URL or path to the technology icon',
    example: 'https://example.com/icons/reactjs.svg',
  })
  @IsOptional()
  @IsString()
  icon?: string;
}
