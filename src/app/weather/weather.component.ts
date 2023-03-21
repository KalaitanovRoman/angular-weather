import '@angular/common/locales/global/ru';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { Store } from '@ngxs/store';

import { IWeather } from '@core/interfaces/weather.interface';
import { WeatherPageActions } from '@core/store/weather.actions';
import { WeatherState } from '@core/store/weather.state';


@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
    public form: FormGroup;
    public error$: Observable<boolean>;
    public weatherData$: Observable<IWeather | null>;

    constructor(protected _store: Store, private _route: ActivatedRoute, private _router: Router) {
        this.weatherData$ = _store.select(WeatherState.getWeatherData);
        this.error$ = _store.select(WeatherState.checkError);
    }

    ngOnInit(): void {
        const { city } = this._route.snapshot.queryParams;

        if (city) {
            this._store.dispatch(new WeatherPageActions.GetWeather({ city }));
        }

        this.form = new FormGroup({
            city: new FormControl(city, [Validators.required]),
        });
    }

    onSubmit() {
        const { city } = this.form.value;

        if (!city) {
            return;
        }

        void this._router.navigate([], { queryParams: { city } });

        this._store.dispatch(new WeatherPageActions.GetWeather({ city }));
    }
}