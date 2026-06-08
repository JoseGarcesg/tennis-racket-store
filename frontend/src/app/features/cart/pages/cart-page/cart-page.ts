import { Component, inject } from '@angular/core';
import { Cart } from '../../../cart/services/cart';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  imports: [CommonModule,
    RouterLink],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
})
export class CartPage {
  cart =
    inject(Cart);

  removeItem(id: number) {

    this.cart.remove(id);
  }

  setDefaultImage(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'racket-placeholder.png';
  }
}
