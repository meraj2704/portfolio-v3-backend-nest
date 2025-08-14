"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiErrorResponse = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ApiErrorResponse = (statusCode, description) => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiResponse)({
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
    }));
};
exports.ApiErrorResponse = ApiErrorResponse;
//# sourceMappingURL=api-error-response.decorator.js.map