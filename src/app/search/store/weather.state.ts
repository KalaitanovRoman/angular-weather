import { Injectable } from '@angular/core';

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
    constructor(private _service: WeatherService) {}

    @Selector()
    static getWeatherList(state: WeatherStateModel) {
        return state.weatherData;
    }

    @Selector()
    static checkError(state: WeatherStateModel) {
        return state.error;
    }

    @Action(WeatherPageActions.GetWeather)
    initState(ctx: StateContext<WeatherStateModel>, { payload }: WeatherPageActions.GetWeather) {
        return this._service.getWeatherList(payload.city).pipe(
            tap(response => {
                const weatherData = {
                    ...response,
                    list: response.list.filter(item => item.dt_txt.includes('12:00:00')),
                };

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