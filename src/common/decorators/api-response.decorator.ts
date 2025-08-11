import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const ApiCustomResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiResponse({
      schema: {
        allOf: [
          { $ref: '#/components/schemas/ApiResponse' },
          {
            properties: {
              data: {
                $ref: `#/components/schemas/${model.name}`,
              },
            },
          },
        ],
      },
    }),
  );
};
