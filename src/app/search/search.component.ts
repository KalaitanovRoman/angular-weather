import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { Store } from '@ngxs/store';

import { SubscriberComponent } from '@core/classes/subscriber.class';
import { IWeather } from '@core/interfaces/weather.interface';

import { WeatherPageActions } from './store/weather.actions';
import { WeatherState } from './store/weather.state';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent extends SubscriberComponent implements OnInit {
    public form: FormGroup;
    public weatherData$: Observable<IWeather | null>;

    constructor(protected _store: Store, private _route: ActivatedRoute, private _router: Router) {
        super();

        this.weatherData$ = _store.select(WeatherState.getWeatherList);
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

        void this._router.navigate([], { queryParams: { city } });

        this._store.dispatch(new WeatherPageActions.GetWeather({ city }));
    }
}
