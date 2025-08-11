import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponseInterface } from '../interfaces/api-response.interface';

type ExceptionResponse =
  | string
  | {
      message?: string | string[];
      error?: string;
      errorCode?: string;
      statusCode?: number;
    };

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorCode = 'INTERNAL_ERROR';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse: ExceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else {
        message = Array.isArray(exceptionResponse.message)
          ? exceptionResponse.message.join(', ')
          : exceptionResponse.message ||
            exceptionResponse.error ||
            'Unknown error';

        errorCode = exceptionResponse.errorCode || 'HTTP_ERROR';
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    const errorResponse: ApiResponseInterface<null> = {
      success: false,
      message,
      error: {
        code: errorCode,
      },
    };

    response.status(status).json(errorResponse);
  }
}
