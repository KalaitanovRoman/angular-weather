import { IWeatherDescription, IWeatherList } from '@core/interfaces/weather.interface';
import { BaseMapper } from '@core/mappers/base.mapper';

export class WeatherListMapper extends BaseMapper<IWeatherList> {
    mapFrom(data: any): IWeatherList {
        return {
            dt_txt: this.typeCast.getAsString(data.dt_txt),
            main: {
                temp: this.typeCast.getAsNumber(data.main.temp),
                feelsLike: this.typeCast.getAsNumber(data.main.feelsLike),
                tempMin: this.typeCast.getAsNumber(data.main.tempMin),
                tempMax: this.typeCast.getAsNumber(data.main.tempMax),
                pressure: this.typeCast.getAsNumber(data.main.pressure),
                humidity: this.typeCast.getAsNumber(data.main.humidity),
            },
            wind: {
                speed: this.typeCast.getAsNumber(data.wind.humidity),
            },
            weather: [
                {
                    icon: this.typeCast.getAsString(data.weather.icon),
                    description: this.typeCast.getAsString(data.weather.description),
                },
            ] as IWeatherDescription[],
        };
    }
}
