"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaErrorMessage = exports.PrismaErrorCode = void 0;
var PrismaErrorCode;
(function (PrismaErrorCode) {
    PrismaErrorCode["UniqueConstraint"] = "P2002";
    PrismaErrorCode["RecordNotFound"] = "P2025";
})(PrismaErrorCode || (exports.PrismaErrorCode = PrismaErrorCode = {}));
const getPrismaErrorMessage = (error) => {
    if (typeof error === 'object' && error !== null && 'code' in error) {
        const prismaError = error;
        const errorCode = String(prismaError.code);
        switch (errorCode) {
            case String(PrismaErrorCode.UniqueConstraint): {
                const targetField = prismaError.meta?.target?.[0] || 'data';
                return `A record with this ${targetField} already exists.`;
            }
            case String(PrismaErrorCode.RecordNotFound): {
                return 'The requested record was not found.';
            }
            default: {
                return 'A database error occurred.';
            }
        }
    }
    return 'An unknown database error occurred.';
};
exports.getPrismaErrorMessage = getPrismaErrorMessage;
//# sourceMappingURL=prisma.errors.js.map