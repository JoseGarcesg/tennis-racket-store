import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule, } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Cart } from '../../../cart/services/cart';
import { Order } from '../../../../core/services/order';
import { PAYMENT_METHODS } from '../../../../core/constants/payment-methods';
import { Toast } from '../../../../shared/services/toast';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [FormsModule, CommonModule, CurrencyPipe],
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.css',
})
export class CheckoutPage {

  private cartService = inject(Cart);
  private orderService = inject(Order);
  private toastService = inject(Toast);

  customerName = '';
  email = '';
  selectedPayment = 'PSE';
  isLoading = signal(false);
  orderCreated = signal(false);
  lastOrder = signal<any | null>(null);
  today = new Date();

  paymentMethods = PAYMENT_METHODS;

  cart = this.cartService.cart;

  total = computed(() =>
    this.cart().reduce((sum, item) => sum + (item.racket.price * item.quantity), 0)
  );

  canSubmit(): boolean {
    return (
      this.customerName.trim() !== '' &&
      this.email.trim() !== '' &&
      this.selectedPayment !== '' &&
      this.cart().length > 0 &&
      !this.isLoading() &&
      !this.orderCreated()
    );
  }

  createOrder() {

    if (!this.canSubmit()) return;

    this.isLoading.set(true);

    const payload = {
      customerName: this.customerName,
      email: this.email,
      paymentMethod: this.selectedPayment,
      items: this.cart().map(item => ({
        racketId: item.racket.id,
        quantity: item.quantity,
        price: item.racket.price
      }))
    };

    this.orderService
      .createOrder(payload)
      .subscribe({
        next: () => {

          this.lastOrder.set({
            customerName: this.customerName,
            email: this.email,
            paymentMethod: this.selectedPayment,
            items: [...this.cart()],
            total: this.total()
          });

          this.orderCreated.set(true);

          this.cartService.clearCart();

          this.customerName = '';
          this.email = '';

          this.isLoading.set(false);
        },

        error: (error) => {

          console.error(error);

          const message =
            error.error.message ??
            'Could not create order';

          this.toastService.show(
            message,
            'error'
          );

          this.isLoading.set(false);
        }
      });
  }

  setDefaultImage(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'racket-placeholder.png';
  }
}