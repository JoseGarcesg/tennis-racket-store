import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Racket } from '../../../core/models/racket.model';
import { RACKETS } from '../../../../assets/mock/rackets';

@Injectable({
  providedIn: 'root'
})
export class Products {

  getProducts(): Observable<Racket[]> {
    return of(RACKETS);
  }
}
