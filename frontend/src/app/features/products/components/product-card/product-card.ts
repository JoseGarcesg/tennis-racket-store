import { Component, inject, input } from '@angular/core';
import { Racket } from '../../../../core/models/racket.model';
import { CommonModule } from '@angular/common';

import { Cart } from '../../../cart/services/cart';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {

  racket = input.required<Racket>();

  private cart =
    inject(Cart);

  addToCart() {

    this.cart.addToCart(
      this.racket()
    );

    console.log(
      `Added ${this.racket().name} to cart`
    );

    console.log(
      `Current cart items: ${JSON.stringify(this.cart.cart())}`
    );
  }
}
