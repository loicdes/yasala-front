import { Injectable } from '@angular/core';
import { Http } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    currentUser: any;
    constructor(private http: Http) { }

    getByLoginPassword(login: string, password: string): Observable<any> {
        return this.http.get(`/user?login=${login}&password=${password}`);
    }
    createUser(user: any): Observable<any> {
        return this.http.post(user, `/user${user._id ? '/' + user._id : ''}`);
    }
}
