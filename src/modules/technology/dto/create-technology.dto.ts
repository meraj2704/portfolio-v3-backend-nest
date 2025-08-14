import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTechnologyDto {
  @ApiProperty({
    description: 'The name of the technology (must be unique)',
    example: 'React',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'URL or path to the technology icon',
    example: 'https://example.com/icons/react.svg',
  })
  @IsOptional()
  @IsString()
  icon?: string;
}
