import { Injectable, computed, inject, signal } from '@angular/core';
import { CartItem } from '../../../core/models/cart-item.model';
import { Racket } from '../../../core/models/racket.model';
import { Toast } from '../../../shared/services/toast';

@Injectable({
  providedIn: 'root'
})
export class Cart {

  private cartSignal =
    signal<CartItem[]>([]);

  private toast = inject(Toast);

  cart = this.cartSignal.asReadonly();

  totalItems = computed(() => this.cart().reduce((acc, item) => acc + item.quantity, 0));

  totalPrice = computed(() => this.cart().reduce((acc, item) => acc + item.racket.price * item.quantity, 0));

  addToCart(racket: Racket) {

    const currentItems = this.cart();

    const existingItem =
      currentItems.find(
        item => item.racket.id === racket.id
      );

    const quantityInCart =
      existingItem?.quantity ?? 0;

    if (quantityInCart >= racket.stock) {

      this.toast.show(
        `Only ${racket.stock} units available`,
        'error'
      );

      return;
    }

    if (existingItem) {

      this.cartSignal.update(items =>
        items.map(item =>
          item.racket.id === racket.id
            ? {
              ...item,
              quantity: item.quantity + 1
            }
            : item
        )
      );

    } else {

      this.cartSignal.update(items => [
        ...items,
        {
          racket,
          quantity: 1
        }
      ]);
    }

    this.toast.show(
      `${racket.name} added to cart`,
      'success'
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

  getQuantity(id: number): number {

    const item =
      this.cart()
        .find(i => i.racket.id === id);

    return item?.quantity ?? 0;
  }
}