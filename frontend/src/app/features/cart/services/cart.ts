import { Injectable, computed, signal } from '@angular/core';
import { CartItem } from '../../../core/models/cart-item.model';
import { Racket } from '../../../core/models/racket.model';

@Injectable({
  providedIn: 'root'
})
export class Cart {

  private cartSignal =
    signal<CartItem[]>([]);

  cart = this.cartSignal.asReadonly();

  totalItems = computed(() =>
    this.cart().reduce(
      (acc, item) =>
        acc + item.quantity,
      0
    )
  );

  totalPrice = computed(() =>
    this.cart().reduce(
      (acc, item) =>
        acc +
        item.racket.price *
        item.quantity,
      0
    )
  );

  addToCart(racket: Racket) {

    const currentItems =
      this.cart();

    const existingItem =
      currentItems.find(
        item =>
          item.racket.id ===
          racket.id
      );

    if (existingItem) {

      this.cartSignal.update(
        items =>
          items.map(item =>
            item.racket.id ===
              racket.id
              ? {
                ...item,
                quantity:
                  item.quantity + 1
              }
              : item
          )
      );

      return;
    }

    this.cartSignal.update(
      items => [
        ...items,
        {
          racket,
          quantity: 1
        }
      ]
    );
  }

  remove(id: number) {

    this.cartSignal.update(
      items =>
        items.filter(
          item =>
            item.racket.id !== id
        )
    );
  }

  clearCart() {
    this.cartSignal.set([]);
  }
}