import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';

import { Action, Selector, State, StateContext } from '@ngxs/store';

import { IWeather } from '@core/interfaces/weather.interface';
import { WeatherService } from '@core/services/weather.service';

import { WeatherPageActions } from './weather.actions';

const defaultsState = {
    isLoading: false,
    weatherList: null,
};

export class WeatherStateModel {
    isLoading: boolean;
    weatherList: IWeather | null;
}

@State<WeatherStateModel>({
    name: 'weatherPage',
    defaults: defaultsState,
})
@Injectable({ providedIn: 'root' })
export class WeatherState {
    constructor(private _service: WeatherService) {}

    @Selector()
    static getStatus(state: WeatherStateModel) {
        return state.isLoading;
    }

    @Selector()
    static getWeatherList(state: WeatherStateModel) {
        return state.weatherList;
    }

    @Action(WeatherPageActions.GetWeather)
    initState(ctx: StateContext<WeatherStateModel>, { payload }: WeatherPageActions.GetWeather) {
        ctx.patchState({
            isLoading: true,
        });

        return this._service.getWeatherList(payload.city).pipe(
            tap(response => {
                // return response.list.filter((item: any) => item.dt_txt.includes('12:00:00'));

                console.log('!!!', response);
                ctx.patchState({
                    weatherList: response,
                    isLoading: false,
                });
            })
        );
    }
}
