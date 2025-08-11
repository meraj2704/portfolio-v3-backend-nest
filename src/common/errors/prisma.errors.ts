export enum PrismaErrorCode {
  UniqueConstraint = 'P2002',
  RecordNotFound = 'P2025',
}

type PrismaError = {
  code: PrismaErrorCode | string;
  meta?: {
    target?: string[];
  };
};

export const getPrismaErrorMessage = (error: unknown): string => {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const prismaError = error as PrismaError;
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
