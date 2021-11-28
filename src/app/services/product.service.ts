import { Injectable } from '@angular/core';
import { Http } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(private http: Http) { }

    getAllProducts(): Observable<any> {
        return this.http.get('/products/');
    }
    getAllProductsByCategory(category: string): Observable<any> {
        return this.http.get(`/products/${category}`);
    }
    getById(id: string): Observable<any> {
        return this.http.get(`/products/product/${id}`);
    }
    createOrUpdateProduct(product: any): Observable<any> {
        return this.http.post(product, `/products${product._id ? '/' + product._id : ''}`);
    }
}
