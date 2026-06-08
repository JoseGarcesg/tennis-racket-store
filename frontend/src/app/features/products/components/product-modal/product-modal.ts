import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Racket } from '../../../../core/models/racket.model';
import { Cart } from '../../../cart/services/cart';

@Component({
  selector: 'app-product-modal',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './product-modal.html',
  styleUrl: './product-modal.css',
})
export class ProductModal {
  @Input({ required: true })
  racket!: Racket;

  @Output()
  close = new EventEmitter<void>();

  private cart = inject(Cart);

  addToCart() {
    this.cart.addToCart(this.racket);
  }

  closeModal() {
    this.close.emit();
  }
}
