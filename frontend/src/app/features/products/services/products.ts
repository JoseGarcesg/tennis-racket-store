import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Racket } from '../../../core/models/racket.model';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Products {

  private http =
    inject(HttpClient);

  private apiUrl =
    environment.apiUrl;

  getProducts(): Observable<Racket[]> {
    return this.http.get<Racket[]>(
      `${this.apiUrl}/rackets`
    );
  }
}
