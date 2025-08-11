import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const ApiErrorResponse = (statusCode: number, description: string) => {
  return applyDecorators(
    ApiResponse({
      status: statusCode,
      description,
      schema: {
        example: {
          success: false,
          message: description,
          error: {
            code: 'ERROR_CODE',
          },
        },
      },
    }),
  );
};
