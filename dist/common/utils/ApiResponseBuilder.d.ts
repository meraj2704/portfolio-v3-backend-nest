import { HttpStatus } from '@nestjs/common';
import { IApiResponse } from '../interfaces/api-response.interface';
export declare class ApiResponseBuilder {
    static success<T>(data: T, message?: string, statusCode?: HttpStatus, meta?: any): IApiResponse<T>;
    static paginated<T>(data: T, pagination: {
        page: number;
        limit: number;
        total: number;
    }, message?: string): IApiResponse<T>;
    static empty(message?: string, statusCode?: HttpStatus): {
        success: boolean;
        message: string;
        statusCode: HttpStatus;
    };
}
