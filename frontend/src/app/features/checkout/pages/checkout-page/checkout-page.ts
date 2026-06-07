import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PAYMENT_METHODS } from '../../../../core/constants/payment-methods';
import { Cart } from '../../../cart/services/cart';

@Component({
  selector: 'app-checkout-page',
  imports: [CommonModule],
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.css',
})
export class CheckoutPage {
  cart = inject(Cart);

  paymentMethods = PAYMENT_METHODS;

  selectedPayment = signal<number | null>(null);

  selectPayment(id: number) {
    this.selectedPayment.set(id);
  }

  completeOrder() {

    if (!this.selectedPayment()) {
      alert('Please select a payment method');
      return;
    }

    alert('Order completed successfully 🎉');

    this.cart.clearCart();
  }
}
