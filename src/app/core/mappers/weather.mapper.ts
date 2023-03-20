import { IWeather } from '@core/interfaces/weather.interface';
import { BaseMapper } from '@core/mappers/base.mapper';
import { WeatherCityMapper } from '@core/mappers/weather-city.mapper';
import { WeatherListMapper } from '@core/mappers/weather-list.mapper';

export class WeatherMapper extends BaseMapper<IWeather> {
    private _cityMapper = new WeatherCityMapper();
    private _listMapper = new WeatherListMapper();

    mapFrom(data: any): IWeather {
        return {
            city: this._cityMapper.mapFrom(data.city),
            list: this._listMapper.mapFromArray(data.list || []),
        };
    }
}
