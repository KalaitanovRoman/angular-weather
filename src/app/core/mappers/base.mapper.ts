import { IBaseMapper } from '@core/interfaces/base-mapper.interface';

import { TypeCastHelper } from '../helpers/type-cast.helper';

export abstract class BaseMapper<M> implements IBaseMapper<M> {
    typeCast = new TypeCastHelper();

    mapFrom(data: any, ...args: any[]): M {
        return { ...data } as M;
    }

    mapFromArray(data: any, ...args: any[]): M[] {
        if (!Array.isArray(data)) {
            console.error(
                'mapFromArray: Given data must be an array (now it is ' +
                    typeof data +
                    '). Incorrect data will be defined as empty array.'
            );
            data = [];
        }

        return data.map((entry: any) => this.mapFrom(entry, ...args));
    }

    mapTo(model: M | any, ...args: any[]): any {
        return { ...model };
    }

    mapToArray(models: M[], ...args: any[]): any {
        if (!Array.isArray(models)) {
            console.error(
                'mapToArray: Given data must be an array (now it is ' +
                    typeof models +
                    '). Incorrect data will be defined as empty array.'
            );
            models = [];
        }

        return models.map(model => this.mapTo(model, ...args));
    }
}
