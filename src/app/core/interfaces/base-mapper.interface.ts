import { TypeCastHelper } from '@core/helpers/type-cast.helper';

export interface IBaseMapper<M> {
    typeCast: TypeCastHelper;

    mapTo?: (model: M, ...args: any[]) => any;
    mapFrom?: (data: any, ...args: any[]) => M;

    mapToArray?: (models: M[], ...args: any[]) => any;
    mapFromArray?: (data: any[], ...args: any[]) => M[];
}
