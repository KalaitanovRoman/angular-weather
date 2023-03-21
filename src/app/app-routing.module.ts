import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesEndpointsEnum } from '@core/enums/index.enum';

import { DeadTokenComponent } from './dead-token/dead-token.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WeatherComponent } from './weather/weather.component';


const routes: Routes = [
    {
        path: '',
        component: WeatherComponent,
    },
    {
        path: PagesEndpointsEnum.Token,
        component: DeadTokenComponent,
    },
    { path: '**', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}