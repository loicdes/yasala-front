import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Http {

    constructor(private httpClient: HttpClient) {
    }

    post(body: any, ext = ''): any {
      return this.httpClient.post(environment.API_ROUTE + ext, body)
      .pipe(catchError(error => this.handleError(error)));
    }

    get(ext = ''): any {
      return this.httpClient.get(environment.API_ROUTE + ext)
      .pipe(catchError(error => this.handleError(error)));
    }

    delete(ext = ''): any {
      return this.httpClient.delete(environment.API_ROUTE + ext)
      .pipe(catchError(error => this.handleError(error)));
    }


    private handleError(error: HttpErrorResponse) {
        return throwError(error);
      }
}
