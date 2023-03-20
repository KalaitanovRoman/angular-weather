export namespace WeatherPageActions {
    export class GetWeather {
        static readonly type = '[Weather Page] Get weather data';

        constructor(public payload: { city: string }) {}
    }
}
