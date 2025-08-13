export interface ApiResponseInterface<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    details?: string;
  };
}

// src/common/interfaces/api-response.interface.ts
import { HttpStatus } from '@nestjs/common';

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    [key: string]: any;
  };
  statusCode?: HttpStatus;
}
