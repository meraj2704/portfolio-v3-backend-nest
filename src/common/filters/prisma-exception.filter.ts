// src/filters/prisma-exception.filter.ts
import { Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: HttpStatus;
    let message: string;

    switch (exception.code) {
      case 'P2002': // Unique constraint violation
        status = HttpStatus.CONFLICT;
        message = `Conflict: ${this.formatConstraintError(exception)}`;
        break;

      case 'P2025': // Record not found
        status = HttpStatus.NOT_FOUND;
        message = 'Requested resource not found';
        break;

      case 'P2003': // Foreign key constraint
        status = HttpStatus.BAD_REQUEST;
        message = 'Invalid reference data provided';
        break;

      case 'P2000': // Data too long
      case 'P2001': // Value too long
        status = HttpStatus.BAD_REQUEST;
        message = 'Invalid data length';
        break;

      default:
        // Handle all other Prisma errors generically
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Database operation failed';
        console.error('Unhandled Prisma error:', exception);
        return super.catch(exception, host);
    }

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private formatConstraintError(
    exception: Prisma.PrismaClientKnownRequestError,
  ) {
    // Example: "Unique constraint failed on the fields: (`email`)"
    const constraint =
      (exception.meta?.target as string[])?.join(', ') || 'unknown field';
    return `Duplicate value for ${constraint}`;
  }
}
