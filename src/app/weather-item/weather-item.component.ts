import { Component, Input, OnInit } from '@angular/core';

import { IWeatherList } from '@core/interfaces/weather.interface';


@Component({
    selector: '[app-weather-item]',
    templateUrl: './weather-item.component.html',
    styleUrls: ['./weather-item.component.scss'],
})
export class WeatherItemComponent implements OnInit {
    @Input() data: IWeatherList;
    @Input() isToday: boolean = false;

    constructor() {}

    ngOnInit(): void {}
}