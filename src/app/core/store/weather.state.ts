import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Action, Selector, State, StateContext } from '@ngxs/store';

import { IWeather } from '@core/interfaces/weather.interface';
import { WeatherService } from '@core/services/weather.service';

import { WeatherPageActions } from './weather.actions';


const defaultsState = {
    error: false,
    weatherData: null,
};

export class WeatherStateModel {
    error: boolean;
    weatherData: IWeather | null;
}

@State<WeatherStateModel>({
    name: 'weatherPage',
    defaults: defaultsState,
})
@Injectable({ providedIn: 'root' })
export class WeatherState {
    constructor(private _service: WeatherService, private _titleService: Title) {}

    @Selector()
    static getWeatherData(state: WeatherStateModel) {
        return state.weatherData;
    }

    @Selector()
    static checkError(state: WeatherStateModel) {
        return state.error;
    }

    @Action(WeatherPageActions.GetWeather)
    getWeatherData(ctx: StateContext<WeatherStateModel>, { payload }: WeatherPageActions.GetWeather) {
        return this._service.getWeatherData(payload.city).pipe(
            tap(response => {
                const weatherData = {
                    ...response,
                    list: response.list.filter(item => item.dt_txt.includes('12:00:00')),
                };

                this._titleService.setTitle(`Погода в городе - ${weatherData.city.name}`);

                ctx.patchState({
                    weatherData,
                    error: false,
                });
            }),
            catchError(({ error }) => {
                ctx.patchState({
                    error: true,
                });

                return throwError(error.message);
            })
        );
    }
}