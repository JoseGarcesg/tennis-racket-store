import { Component, inject, Input, signal } from '@angular/core';
import { Racket } from '../../../../core/models/racket.model';
import { CommonModule } from '@angular/common';

import { Cart } from '../../../cart/services/cart';
import { ProductModal } from '../product-modal/product-modal';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, ProductModal],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {

  @Input({
    required: true
  })
  racket!: Racket;

  private cart = inject(Cart);

  showModal = signal(false);

  addToCart() {

    this.cart.addToCart(
      this.racket
    );

    console.log(
      `Added ${this.racket.name} to cart`
    );

    console.log(
      `Current cart items: ${JSON.stringify(this.cart.cart())}`
    );
  }

  openModal() {
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

}
