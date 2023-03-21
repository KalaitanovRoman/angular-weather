import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';

import { WeatherService } from '@core/services/weather.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchComponent } from './search/search.component';
import { WeatherState } from './search/store/weather.state';
import { WeatherItemComponent } from './weather-item/weather-item.component';


@NgModule({
    declarations: [AppComponent, NotFoundComponent, SearchComponent, WeatherItemComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgxsModule.forRoot([WeatherState]),
        NgxsReduxDevtoolsPluginModule.forRoot(),
    ],
    exports: [HttpClientModule],
    providers: [WeatherService, { provide: LOCALE_ID, useValue: 'ru' }],
    bootstrap: [AppComponent],
})
export class AppModule {}