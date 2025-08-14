// src/common/dto/base-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty({ required: false })
  data?: any;

  @ApiProperty({ required: false })
  meta?: any;
}
