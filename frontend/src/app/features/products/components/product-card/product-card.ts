import { Component, input } from '@angular/core';
import { Racket } from '../../../../core/models/racket.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {

  racket = input.required<Racket>();
}
