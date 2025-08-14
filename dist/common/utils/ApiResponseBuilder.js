"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponseBuilder = void 0;
const common_1 = require("@nestjs/common");
class ApiResponseBuilder {
    static success(data, message = 'Success', statusCode = common_1.HttpStatus.OK, meta) {
        return {
            success: true,
            message,
            data,
            meta,
            statusCode,
        };
    }
    static paginated(data, pagination, message = 'Success') {
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
    static empty(message = 'Success', statusCode = common_1.HttpStatus.NO_CONTENT) {
        return {
            success: true,
            message,
            statusCode,
        };
    }
}
exports.ApiResponseBuilder = ApiResponseBuilder;
//# sourceMappingURL=ApiResponseBuilder.js.map