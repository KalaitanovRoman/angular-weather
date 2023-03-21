import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';

import { ErrorInterceptor } from '@core/services/interceptors/error.interceptor';
import { WeatherService } from '@core/services/weather.service';
import { WeatherState } from '@core/store/weather.state';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WeatherItemComponent } from './weather/components/weather-item/weather-item.component';
import { WeatherComponent } from './weather/weather.component';
import { DeadTokenComponent } from './dead-token/dead-token.component';


@NgModule({
    declarations: [AppComponent, NotFoundComponent, WeatherComponent, WeatherItemComponent, DeadTokenComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgxsModule.forRoot([WeatherState]),
        NgxsReduxDevtoolsPluginModule.forRoot(),
    ],
    exports: [HttpClientModule],
    providers: [
        WeatherService,
        { provide: LOCALE_ID, useValue: 'ru' },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}