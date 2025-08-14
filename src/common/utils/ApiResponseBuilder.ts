// src/common/utils/api-response.util.ts
import { HttpStatus } from '@nestjs/common';
import { IApiResponse } from '../interfaces/api-response.interface';

export class ApiResponseBuilder {
  static success<T>(
    data: T,
    message = 'Success',
    statusCode: HttpStatus = HttpStatus.OK,
    meta?: any,
  ): IApiResponse<T> {
    return {
      success: true,
      message,
      data,
      meta,
      statusCode,
    };
  }

  static paginated<T>(
    data: T,
    pagination: { page: number; limit: number; total: number },
    message = 'Success',
  ): IApiResponse<T> {
    return {
      success: true,
      message,
      data,
      meta: {
        page: pagination.page,
        limit: pagination.limit,
        total: pagination.total,
      },
    };
  }

  static empty(message = 'Success', statusCode = HttpStatus.NO_CONTENT) {
    return {
      success: true,
      message,
      statusCode,
    };
  }
}
