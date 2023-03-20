import { IWeatherCity } from '@core/interfaces/weather.interface';
import { BaseMapper } from '@core/mappers/base.mapper';

export class WeatherCityMapper extends BaseMapper<IWeatherCity> {
    mapFrom(data: any): IWeatherCity {
        return {
            id: this.typeCast.getAsNumber(data.id),
            name: this.typeCast.getAsString(data.name),
        };
    }
}
