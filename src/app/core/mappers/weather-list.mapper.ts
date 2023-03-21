import { IWeatherDescription, IWeatherList } from '@core/interfaces/weather.interface';
import { BaseMapper } from '@core/mappers/base.mapper';

export class WeatherListMapper extends BaseMapper<IWeatherList> {
    mapFrom(data: any): IWeatherList {
        return {
            dt_txt: this.typeCast.getAsString(data.dt_txt),
            main: {
                temp: this.typeCast.getAsNumber(data.main.temp),
                feelsLike: this.typeCast.getAsNumber(data.main.feels_like),
                pressure: this.typeCast.getAsNumber(data.main.pressure),
                humidity: this.typeCast.getAsNumber(data.main.humidity),
            },
            wind: {
                speed: this.typeCast.getAsNumber(data.wind.speed),
            },
            weather: [
                {
                    icon: this.typeCast.getAsString(data.weather[0].icon),
                    description: this.typeCast.getAsString(data.weather[0].description),
                },
            ] as IWeatherDescription[],
        };
    }
}