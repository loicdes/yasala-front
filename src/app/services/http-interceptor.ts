
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { NgxSpinnerService } from 'ngx-spinner';
import { SnackBarService } from './snackbar.service';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private snackBarService: SnackBarService,
        private spinnerService: NgxSpinnerService
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
            // Display the loader screen
            this.spinnerService.show();
            return next.handle(request).pipe(tap(
            (event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                        // stop the loader screen
                        this.spinnerService.hide();
                }
            },
            (err: any) => {
                    // Display the loader screen
                    this.spinnerService.hide();
                    if (err instanceof HttpErrorResponse) {
                    if (err.status >= 400 && err.status < 500) {
                        if (err.error) {
                            this.snackBarService.open(
                                `${err.error}`,
                                'error'
                            );
                        }
                    }
                    if (err.status >= 500 || err.status === 0) {
                        this.snackBarService.open(
                            `${err.status}: Server error.`,
                            'error'
                        );
                    }
                }
            }
        ));
    }
}
