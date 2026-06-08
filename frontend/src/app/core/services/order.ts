import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn:
        'root'
})
export class Order {

    private http = inject(HttpClient);

    private apiUrl = environment.apiUrl;

    createOrder(order: unknown): Observable<unknown> {
        return this.http.post(`${this.apiUrl}/orders`, order);
    }
}