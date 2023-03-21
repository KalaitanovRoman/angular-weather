import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { WEATHER } from '@core/constants/api.constants';
import { IWeather } from '@core/interfaces/weather.interface';
import { WeatherMapper } from '@core/mappers/weather.mapper';


@Injectable({
    providedIn: 'root',
})
export class WeatherService {
    private _weatherMapper = new WeatherMapper();

    constructor(private _http: HttpClient) {}

    getWeatherData(city: string) {
        return this._http.get(WEATHER, { params: { q: city } }).pipe(
            map((response: any): IWeather => {
                return this._weatherMapper.mapFrom(response);
            })
        );
    }
}