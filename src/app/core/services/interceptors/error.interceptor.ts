import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { PagesEndpointsEnum } from '@core/enums/index.enum';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private _zone: NgZone, private _router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
    }

    private handleError(error: HttpErrorResponse): Observable<any> {
        if (error?.status === 401) {
            this._zone.run(() => {
                void this._router.navigate([PagesEndpointsEnum.Token]);
            });
        }

        return throwError(error);
    }
}