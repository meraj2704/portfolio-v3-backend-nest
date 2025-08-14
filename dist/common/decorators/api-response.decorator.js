"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiCustomResponse = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const base_response_dto_1 = require("../dto/base-response.dto");
const ApiCustomResponse = (model, isArray = false) => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(base_response_dto_1.BaseResponseDto, model), (0, swagger_1.ApiResponse)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(base_response_dto_1.BaseResponseDto) },
                {
                    properties: {
                        data: isArray
                            ? {
                                type: 'array',
                                items: { $ref: (0, swagger_1.getSchemaPath)(model) },
                            }
                            : { $ref: (0, swagger_1.getSchemaPath)(model) },
                    },
                },
            ],
        },
    }));
};
exports.ApiCustomResponse = ApiCustomResponse;
//# sourceMappingURL=api-response.decorator.js.map