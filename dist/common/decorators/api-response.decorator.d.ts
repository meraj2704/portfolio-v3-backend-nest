import { Type } from '@nestjs/common';
export declare const ApiCustomResponse: <TModel extends Type<any>>(model: TModel, isArray?: boolean) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol | undefined, descriptor?: TypedPropertyDescriptor<Y> | undefined) => void;
