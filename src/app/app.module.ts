import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
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

@NgModule({
    declarations: [AppComponent, NotFoundComponent, SearchComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgxsModule.forRoot([WeatherState]),
        NgxsReduxDevtoolsPluginModule.forRoot(),
    ],
    exports: [HttpClientModule],
    providers: [WeatherService],
    bootstrap: [AppComponent],
})
export class AppModule {}
