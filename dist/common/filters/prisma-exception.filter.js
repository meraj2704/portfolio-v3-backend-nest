"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaClientExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const client_1 = require("@prisma/client");
let PrismaClientExceptionFilter = class PrismaClientExceptionFilter extends core_1.BaseExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status;
        let message;
        switch (exception.code) {
            case 'P2002':
                status = common_1.HttpStatus.CONFLICT;
                message = `Conflict: ${this.formatConstraintError(exception)}`;
                break;
            case 'P2025':
                status = common_1.HttpStatus.NOT_FOUND;
                message = 'Requested resource not found';
                break;
            case 'P2003':
                status = common_1.HttpStatus.BAD_REQUEST;
                message = 'Invalid reference data provided';
                break;
            case 'P2000':
            case 'P2001':
                status = common_1.HttpStatus.BAD_REQUEST;
                message = 'Invalid data length';
                break;
            default:
                status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
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
    formatConstraintError(exception) {
        const constraint = exception.meta?.target?.join(', ') || 'unknown field';
        return `Duplicate value for ${constraint}`;
    }
};
exports.PrismaClientExceptionFilter = PrismaClientExceptionFilter;
exports.PrismaClientExceptionFilter = PrismaClientExceptionFilter = __decorate([
    (0, common_1.Catch)(client_1.Prisma.PrismaClientKnownRequestError)
], PrismaClientExceptionFilter);
//# sourceMappingURL=prisma-exception.filter.js.map