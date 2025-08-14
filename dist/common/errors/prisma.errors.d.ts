export declare enum PrismaErrorCode {
    UniqueConstraint = "P2002",
    RecordNotFound = "P2025"
}
export declare const getPrismaErrorMessage: (error: unknown) => string;
